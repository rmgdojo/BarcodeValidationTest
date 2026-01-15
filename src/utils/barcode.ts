import { ValidationResult } from "../types";

const WEIGHTS = [8, 6, 4, 2, 3, 5, 9, 7];

function calculateCheckDigit(serial: string): number {
  const sum = serial
    .split("")
    .map(Number)
    .reduce((acc, d, i) => acc + d * WEIGHTS[i], 0);

  const result = 11 - (sum % 11);
  if (result === 10) return 0;
  if (result === 11) return 5;
  return result;
}

export function validateBarcode(barcode: string): ValidationResult {
  if (!barcode.trim()) {
    return { valid: false, error: "Validation failed - Barcode is empty" };
  }

  if (barcode.length !== 13) {
    return { valid: false, error: "Validation failed - Barcode is not the correct length" };
  }

  const prefix = barcode.slice(0, 2);
  const serial = barcode.slice(2, 10);
  const checkDigit = barcode[10];
  const country = barcode.slice(11);

  if (!/^[A-Z]{2}$/.test(prefix)) {
    return { valid: false, error: "Validation failed - Prefix is not in the range AA to ZZ" };
  }

  if (!/^\d{8}$/.test(serial)) {
    return { valid: false, error: "Validation failed - Serial number is invalid" };
  }

  if (Number(checkDigit) !== calculateCheckDigit(serial)) {
    return { valid: false, error: "Validation failed - Check digit is not correct" };
  }

  if (country !== "GB") {
    return { valid: false, error: "Validation failed - Country code is not GB" };
  }

  return { valid: true };
}
