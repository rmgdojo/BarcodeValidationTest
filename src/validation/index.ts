export {
  calculateCheckDigit,
  parseBarcodeComponents,
  validatePrefix,
  validateSerialNumber,
  validateCheckDigit,
  validateCountryCode,
  validateBarcode,
  normalizeBarcode,
  type ValidationResult,
  type BarcodeComponents,
} from './barcodeValidation';

export { mockApiValidation, type ApiValidationResult } from './mockApi';
