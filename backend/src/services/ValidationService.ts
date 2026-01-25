/**
 * Basic validation for check digit calculation
 */
function calculateCheckDigit(serialNumber: string): number {
  const weights = [8, 6, 4, 2, 3, 5, 9, 7];
  let sum = 0;
  
  for (let i = 0; i < 8; i++) {
    const digit = Number.parseInt(serialNumber[i] ?? '0', 10);
    const weight = weights[i];
    if (weight === undefined) {
      throw new Error('Invalid weight index');
    }
    sum += digit * weight;
  }

  let result = 11 - (sum % 11);
  if (result === 10) {
    result = 0;
  } else if (result === 11) {
    result = 5;
  }
  
  return result;
}

/**
 * Mock validation service for backend
 * Simulates async validation with random success/failure for valid barcodes
 */
export class ValidationService {
  /**
   * Simulates API validation
   * - Invalid format barcodes always fail
   * - Valid format barcodes randomly succeed or fail (50% chance) after a random delay
   * 
   * Delay is 1-30 seconds as per requirements (configurable via VALIDATION_DELAY_MAX for testing)
   */
  async validateBarcode(barcode: string): Promise<{ isValid: boolean; message: string }> {
    // Delay: 1-30 seconds per requirements (configurable for testing)
    const maxDelay = Number.parseInt(process.env.VALIDATION_DELAY_MAX ?? '30000', 10);
    const minDelay = 1000; // Always at least 1 second
    const delay = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });

    // First, validate the barcode format
    if (barcode.length !== 13) {
      return {
        isValid: false,
        message: `Barcode ${barcode} validation failed - Invalid length`,
      };
    }

    const prefix = barcode.slice(0, 2);
    const serialNumber = barcode.slice(2, 10);
    const checkDigit = barcode.slice(10, 11);
    const countryCode = barcode.slice(11, 13);

    if (!/^[A-Z]{2}$/.test(prefix)) {
      return {
        isValid: false,
        message: `Barcode ${barcode} validation failed - Invalid prefix`,
      };
    }

    if (!/^\d{8}$/.test(serialNumber)) {
      return {
        isValid: false,
        message: `Barcode ${barcode} validation failed - Invalid serial number`,
      };
    }

    const calculatedCheckDigit = calculateCheckDigit(serialNumber);
    const providedCheckDigit = Number.parseInt(checkDigit, 10);

    if (calculatedCheckDigit !== providedCheckDigit) {
      return {
        isValid: false,
        message: `Barcode ${barcode} validation failed - Invalid check digit`,
      };
    }

    if (countryCode !== 'GB') {
      return {
        isValid: false,
        message: `Barcode ${barcode} validation failed - Invalid country code`,
      };
    }

    // Format is valid - now randomly succeed or fail to simulate real-world scenarios
    // (network issues, server errors, database problems, etc.)
    const isValid = Math.random() >= 0.5;

    if (isValid) {
      return {
        isValid: true,
        message: `Barcode ${barcode} is valid`,
      };
    }

    return {
      isValid: false,
      message: `Barcode ${barcode} validation failed - Server validation rejected (simulated network/server error)`,
    };
  }
}

export const validationService = new ValidationService();
