/**
 * Validation status for a barcode validation attempt
 */
export type ValidationStatus = 'validating' | 'valid' | 'invalid';

/**
 * Result of client-side validation
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Entry in the validation history
 */
export interface HistoryEntry {
  id: string;
  barcode: string;
  status: ValidationStatus;
  timestamp: number;
  error?: string;
}

/**
 * API validation request payload
 */
export interface ValidationRequest {
  barcode: string;
}

/**
 * API validation response
 */
export interface ValidationResponse {
  isValid: boolean;
  message: string;
}

/**
 * Barcode structure breakdown
 */
export interface BarcodeStructure {
  prefix: string;
  serialNumber: string;
  checkDigit: string;
  countryCode: string;
}
