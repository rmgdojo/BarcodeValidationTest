/**
 * Mock API for simulating backend barcode validation.
 *
 * This simulates network latency and random success/failure
 * to test async operations, loading states, and error handling.
 */

export interface ApiValidationResult {
  success: boolean;
  barcode: string;
  message: string;
}

/**
 * Simulates an API call to validate a barcode.
 *
 * - Returns a Promise that resolves or rejects after 1-30 seconds
 * - Randomly succeeds or fails (50% chance each)
 * - Used to test async operations and concurrent validations
 */
export function mockApiValidation(barcode: string): Promise<ApiValidationResult> {
  return new Promise((resolve, reject) => {
    // Random delay between 1-30 seconds (1000-30000ms)
    const delay = Math.floor(Math.random() * 29000) + 1000;

    // 50% chance of success
    const willSucceed = Math.random() >= 0.5;

    setTimeout(() => {
      if (willSucceed) {
        resolve({
          success: true,
          barcode,
          message: 'Barcode validated successfully by server',
        });
      } else {
        reject({
          success: false,
          barcode,
          message: 'Server validation failed - please try again',
        });
      }
    }, delay);
  });
}
