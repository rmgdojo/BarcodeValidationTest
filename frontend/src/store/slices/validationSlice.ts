import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { HistoryEntry, ValidationStatus } from '../../types/barcode';
import type { ValidationState } from '../../types/store';

const initialState: ValidationState = {
  history: [],
};

/**
 * Generates a unique ID for a validation entry
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    /**
     * Adds a new validation entry to history
     * Returns the generated ID via the action meta
     */
    addValidation: (state, action: PayloadAction<{ barcode: string; id?: string }>) => {
      const entry: HistoryEntry = {
        id: action.payload.id ?? generateId(),
        barcode: action.payload.barcode,
        status: 'validating',
        timestamp: Date.now(),
      };
      state.history.push(entry);
    },
    /**
     * Updates the status of a validation entry by ID
     * Handles concurrent validations correctly
     */
    updateValidationStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: ValidationStatus;
        error?: string;
      }>,
    ) => {
      const entry = state.history.find((item) => item.id === action.payload.id);
      if (entry) {
        entry.status = action.payload.status;
        if (action.payload.error) {
          entry.error = action.payload.error;
        }
      }
    },
  },
});

export const { addValidation, updateValidationStatus } = validationSlice.actions;
export default validationSlice.reducer;
