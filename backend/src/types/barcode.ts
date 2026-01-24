/**
 * Validation request payload
 */
export interface ValidationRequest {
  barcode: string;
}

/**
 * Validation response
 */
export interface ValidationResponse {
  isValid: boolean;
  message: string;
}
