import { useState, useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addValidation, updateValidationStatus } from '../store/slices/validationSlice';
import { showNotification } from '../store/slices/uiSlice';
import { validationService } from '../services/ValidationService';
import { apiService } from '../services/ApiService';

/**
 * Custom hook for barcode validation
 * Coordinates client-side and API validation
 * Follows Single Responsibility Principle - handles validation flow
 */
export function useBarcodeValidation() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateBarcode = useCallback(
    async (barcode: string): Promise<{ success: boolean; error?: string }> => {
      setIsSubmitting(true);

      try {
        // Phase 1: Client-side pre-validation
        const clientResult = validationService.validate(barcode);

        if (!clientResult.isValid) {
          setIsSubmitting(false);
          return {
            success: false,
            error: clientResult.error,
          };
        }

        // Generate ID for this validation entry
        const entryId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        // Client-side validation passed - add to history with "validating" status
        dispatch(addValidation({ barcode, id: entryId }));

        // Show success notification for passing pre-validation
        dispatch(
          showNotification({
            message: 'Barcode format is valid. Validating with server...',
            type: 'info',
          }),
        );

        // Phase 2: API validation (async)
        try {
          const apiResult = await apiService.validateBarcode(barcode);

          // Update the entry with API result
          dispatch(
            updateValidationStatus({
              id: entryId,
              status: apiResult.isValid ? 'valid' : 'invalid',
              error: apiResult.isValid ? undefined : apiResult.message,
            }),
          );

          dispatch(
            showNotification({
              message: apiResult.message,
              type: apiResult.isValid ? 'success' : 'error',
            }),
          );

          setIsSubmitting(false);
          return { success: true };
        } catch (apiError) {
          // API validation failed
          const errorMessage =
            apiError instanceof Error ? apiError.message : 'API validation failed';

          // Update the entry to invalid status
          dispatch(
            updateValidationStatus({
              id: entryId,
              status: 'invalid',
              error: errorMessage,
            }),
          );

          dispatch(
            showNotification({
              message: errorMessage,
              type: 'error',
            }),
          );

          setIsSubmitting(false);
          return {
            success: false,
            error: errorMessage,
          };
        }
      } catch (error) {
        setIsSubmitting(false);
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred';

        dispatch(
          showNotification({
            message: errorMessage,
            type: 'error',
          }),
        );

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [dispatch],
  );

  return {
    validateBarcode,
    isSubmitting,
  };
}
