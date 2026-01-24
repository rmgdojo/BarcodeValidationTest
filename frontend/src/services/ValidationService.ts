import type { ValidationResult, BarcodeStructure } from '../types/barcode';

/**
 * Interface for validation service
 * Follows Dependency Inversion Principle
 */
export interface IValidationService {
  validate(barcode: string): ValidationResult;
  calculateCheckDigit(serialNumber: string): number;
  parseBarcode(barcode: string): BarcodeStructure | null;
}

/**
 * Weights for check digit calculation
 */
const CHECK_DIGIT_WEIGHTS = [8, 6, 4, 2, 3, 5, 9, 7] as const;

/**
 * Validation service implementing Royal Mail barcode validation rules
 * Follows Single Responsibility Principle - only handles validation logic
 */
export class ValidationService implements IValidationService {
  /**
   * Validates a Royal Mail barcode
   * @param barcode - The barcode string to validate
   * @returns ValidationResult with isValid flag and optional error message
   */
  validate(barcode: string): ValidationResult {
    // Check length
    if (barcode.length !== 13) {
      return {
        isValid: false,
        error: 'Validation failed - Barcode is not the correct length',
      };
    }

    // Parse barcode structure
    const structure = this.parseBarcode(barcode);
    if (!structure) {
      return {
        isValid: false,
        error: 'Validation failed - Invalid barcode format',
      };
    }

    // Validate prefix (positions 1-2: A-Z)
    if (!/^[A-Z]{2}$/.test(structure.prefix)) {
      return {
        isValid: false,
        error: 'Validation failed - Prefix is not in the range AA to ZZ',
      };
    }

    // Validate serial number (positions 3-10: 0-9)
    if (!/^\d{8}$/.test(structure.serialNumber)) {
      return {
        isValid: false,
        error: 'Validation failed - Serial number is not in the range 00 000 000 to 99 999 999',
      };
    }

    // Validate check digit
    const calculatedCheckDigit = this.calculateCheckDigit(structure.serialNumber);
    const providedCheckDigit = Number.parseInt(structure.checkDigit, 10);

    if (calculatedCheckDigit !== providedCheckDigit) {
      return {
        isValid: false,
        error: 'Validation failed - Check digit is not correct',
      };
    }

    // Validate country code (positions 12-13: GB)
    if (structure.countryCode !== 'GB') {
      return {
        isValid: false,
        error: 'Validation failed - Country code is not GB',
      };
    }

    return { isValid: true };
  }

  /**
   * Calculates the check digit for a serial number
   * @param serialNumber - 8-digit serial number string
   * @returns Calculated check digit (0-9)
   */
  calculateCheckDigit(serialNumber: string): number {
    if (serialNumber.length !== 8) {
      throw new Error('Serial number must be exactly 8 digits');
    }

    // Calculate weighted sum
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      const digit = Number.parseInt(serialNumber[i] ?? '0', 10);
      const weight = CHECK_DIGIT_WEIGHTS[i];
      if (weight === undefined) {
        throw new Error('Invalid weight index');
      }
      sum += digit * weight;
    }

    // Calculate: 11 - (sum % 11)
    let result = 11 - (sum % 11);

    // Apply special cases
    if (result === 10) {
      result = 0;
    } else if (result === 11) {
      result = 5;
    }

    return result;
  }

  /**
   * Parses a barcode string into its component parts
   * @param barcode - The barcode string to parse
   * @returns BarcodeStructure or null if format is invalid
   */
  parseBarcode(barcode: string): BarcodeStructure | null {
    if (barcode.length !== 13) {
      return null;
    }

    return {
      prefix: barcode.slice(0, 2),
      serialNumber: barcode.slice(2, 10),
      checkDigit: barcode.slice(10, 11),
      countryCode: barcode.slice(11, 13),
    };
  }
}

// Export singleton instance
export const validationService = new ValidationService();
