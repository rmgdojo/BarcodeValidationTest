/**
 * Royal Mail Barcode Validation Logic
 *
 * Barcode format (13 characters):
 * - Position 1-2: Uppercase letters (A-Z) - Prefix
 * - Position 3-10: Digits (0-9) - Serial number (8 digits)
 * - Position 11: Digit (0-9) - Check digit (calculated)
 * - Position 12-13: "GB" - Country code
 */

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export interface BarcodeComponents {
  prefix: string;
  serialNumber: string;
  checkDigit: string;
  countryCode: string;
}

const BARCODE_LENGTH = 13;
const WEIGHTS = [8, 6, 4, 2, 3, 5, 9, 7];

/**
 * Calculates the check digit for a Royal Mail barcode serial number.
 *
 * Algorithm:
 * 1. Multiply each digit of the 8-digit serial by weights [8, 6, 4, 2, 3, 5, 9, 7]
 * 2. Sum all results
 * 3. Calculate: 11 - (sum % 11)
 * 4. Special cases: 10 → 0, 11 → 5
 */
export function calculateCheckDigit(serialNumber: string): number {
  if (serialNumber.length !== 8 || !/^\d{8}$/.test(serialNumber)) {
    throw new Error('Serial number must be exactly 8 digits');
  }

  const weightedSum = serialNumber
    .split('')
    .reduce((sum, digit, index) => sum + parseInt(digit, 10) * WEIGHTS[index], 0);

  const result = 11 - (weightedSum % 11);

  // Apply special cases
  if (result === 10) return 0;
  if (result === 11) return 5;
  return result;
}

/**
 * Parses a barcode string into its components.
 * Does not validate - just extracts parts.
 */
export function parseBarcodeComponents(barcode: string): BarcodeComponents {
  return {
    prefix: barcode.slice(0, 2),
    serialNumber: barcode.slice(2, 10),
    checkDigit: barcode.slice(10, 11),
    countryCode: barcode.slice(11, 13),
  };
}

/**
 * Validates that the prefix contains only uppercase letters A-Z.
 */
export function validatePrefix(prefix: string): ValidationResult {
  if (!/^[A-Z]{2}$/.test(prefix)) {
    return {
      isValid: false,
      errorMessage: 'Validation failed - Prefix is not in the range AA to ZZ',
    };
  }
  return { isValid: true };
}

/**
 * Validates that the serial number is exactly 8 digits.
 */
export function validateSerialNumber(serialNumber: string): ValidationResult {
  if (!/^\d{8}$/.test(serialNumber)) {
    return {
      isValid: false,
      errorMessage: 'Validation failed - Serial number is not in the range 00000000 to 99999999',
    };
  }
  return { isValid: true };
}

/**
 * Validates the check digit matches the calculated value.
 */
export function validateCheckDigit(serialNumber: string, checkDigit: string): ValidationResult {
  const expectedCheckDigit = calculateCheckDigit(serialNumber);
  const actualCheckDigit = parseInt(checkDigit, 10);

  if (isNaN(actualCheckDigit) || actualCheckDigit !== expectedCheckDigit) {
    return {
      isValid: false,
      errorMessage: 'Validation failed - Check digit is not correct',
    };
  }
  return { isValid: true };
}

/**
 * Validates that the country code is exactly "GB".
 */
export function validateCountryCode(countryCode: string): ValidationResult {
  if (countryCode !== 'GB') {
    return {
      isValid: false,
      errorMessage: 'Validation failed - Country code is not GB',
    };
  }
  return { isValid: true };
}

/**
 * Main validation function that performs all pre-validation checks.
 * Returns a ValidationResult with specific error message if any check fails.
 */
export function validateBarcode(barcode: string): ValidationResult {
  // Check for empty input
  if (!barcode) {
    return {
      isValid: false,
      errorMessage: 'Validation failed - Barcode cannot be empty',
    };
  }

  // Check length
  if (barcode.length !== BARCODE_LENGTH) {
    return {
      isValid: false,
      errorMessage: 'Validation failed - Barcode is not the correct length',
    };
  }

  // Parse components
  const { prefix, serialNumber, checkDigit, countryCode } = parseBarcodeComponents(barcode);

  // Validate prefix (positions 1-2)
  const prefixResult = validatePrefix(prefix);
  if (!prefixResult.isValid) {
    return prefixResult;
  }

  // Validate serial number (positions 3-10)
  const serialResult = validateSerialNumber(serialNumber);
  if (!serialResult.isValid) {
    return serialResult;
  }

  // Validate country code (positions 12-13) before check digit
  const countryResult = validateCountryCode(countryCode);
  if (!countryResult.isValid) {
    return countryResult;
  }

  // Validate check digit (position 11)
  const checkDigitResult = validateCheckDigit(serialNumber, checkDigit);
  if (!checkDigitResult.isValid) {
    return checkDigitResult;
  }

  return { isValid: true };
}

/**
 * Normalizes barcode input (trim and uppercase).
 */
export function normalizeBarcode(input: string): string {
  return input.trim().toUpperCase();
}
