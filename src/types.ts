/**
 * Status of a validation entry in the history.
 */
export type ValidationStatus = 'validating' | 'valid' | 'invalid';

/**
 * A single entry in the validation history.
 */
export interface ValidationEntry {
  id: string;
  barcode: string;
  status: ValidationStatus;
  timestamp: number;
}
