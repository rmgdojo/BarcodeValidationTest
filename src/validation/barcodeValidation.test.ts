import { describe, it, expect } from 'vitest';
import { calculateCheckDigit, normalizeBarcode, validateBarcode } from './barcodeValidation';

describe('calculateCheckDigit', () => {
  it('should calculate check digit correctly (example from requirements)', () => {
    // Serial: 47312482
    // Weighted sum: (4×8) + (7×6) + (3×4) + (1×2) + (2×3) + (4×5) + (8×9) + (2×7) = 200
    // 11 - (200 % 11) = 11 - 2 = 9
    expect(calculateCheckDigit('47312482')).toBe(9);
  });

  it('should handle special case: result 10 becomes 0', () => {
    // Serial 70000000: sum = 56, 56 % 11 = 1, 11 - 1 = 10 → 0
    expect(calculateCheckDigit('70000000')).toBe(0);
  });

  it('should handle special case: result 11 becomes 5', () => {
    // Serial 00000000: sum = 0, 0 % 11 = 0, 11 - 0 = 11 → 5
    expect(calculateCheckDigit('00000000')).toBe(5);
  });

  it('should throw error for invalid input', () => {
    expect(() => calculateCheckDigit('1234567')).toThrow();
    expect(() => calculateCheckDigit('ABCDEFGH')).toThrow();
  });
});

describe('validateBarcode', () => {
  it('should accept valid barcodes', () => {
    expect(validateBarcode('AB473124829GB').isValid).toBe(true);
    expect(validateBarcode('XH545554533GB').isValid).toBe(true);
    expect(validateBarcode('AA000000005GB').isValid).toBe(true);
  });

  it('should handle lowercase and whitespace when normalized', () => {
    expect(validateBarcode(normalizeBarcode('ab473124829gb')).isValid).toBe(true);
    expect(validateBarcode(normalizeBarcode('  AB473124829GB  ')).isValid).toBe(true);
  });

  it('should reject invalid barcodes with specific errors', () => {
    expect(validateBarcode('').errorMessage).toContain('empty');
    expect(validateBarcode('AB4731248GB').errorMessage).toContain('length');
    expect(validateBarcode('12473124829GB').errorMessage).toContain('Prefix');
    expect(validateBarcode('AB473124820GB').errorMessage).toContain('Check digit');
    expect(validateBarcode('AB473124829US').errorMessage).toContain('Country code');
  });
});
