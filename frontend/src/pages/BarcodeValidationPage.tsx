import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { hideNotification } from '../store/slices/uiSlice';
import { MainLayout } from '../components/templates/MainLayout';
import { BarcodeInputForm } from '../components/organisms/BarcodeInputForm';
import { ValidationHistoryList } from '../components/organisms/ValidationHistoryList';

/**
 * BarcodeValidationPage - Main application page
 * Integrates form and history list with layout
 */
export function BarcodeValidationPage() {
  const notification = useAppSelector((state) => state.ui.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification, dispatch]);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Notification Banner */}
        {notification && (
          <div
            className={`p-4 rounded-lg shadow-md ${
              notification.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : notification.type === 'error'
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : 'bg-blue-100 text-blue-800 border border-blue-300'
            }`}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="flex items-center justify-between">
              <p>{notification.message}</p>
              <button
                onClick={() => {
                  dispatch(hideNotification());
                }}
                className="ml-4 text-current opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current rounded"
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Enter Barcode
          </h2>
          <BarcodeInputForm />
        </div>

        {/* Validation History */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Validation History
          </h2>
          <ValidationHistoryList />
        </div>
      </div>
    </MainLayout>
  );
}
