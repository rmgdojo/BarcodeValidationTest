import { validateBarcode } from "./Barcode";

describe("validateBarcode", () => {
  it("returns error when barcode is empty", () => {
    const result = validateBarcode("");

    expect(result).toEqual({
      valid: false,
      error: "Validation failed - Barcode is empty"
    });
  });

  it("returns error when barcode has incorrect length", () => {
    const result = validateBarcode("AA123");

    expect(result).toEqual({
      valid: false,
      error: "Validation failed - Barcode is not the correct length"
    });
  });

  it("returns error when prefix is invalid", () => {
    const result = validateBarcode("A1123456789GB");

    expect(result).toEqual({
      valid: false,
      error: "Validation failed - Prefix is not in the range AA to ZZ"
    });
  });

  it("returns error when serial number is invalid", () => {
    const result = validateBarcode("AA1234ABCD5GB");

    expect(result).toEqual({
      valid: false,
      error: "Validation failed - Serial number is invalid"
    });
  });

  it("returns error when check digit is incorrect", () => {
    // Correct barcode would have a different check digit
    const result = validateBarcode("AA123456789GB");

    expect(result).toEqual({
      valid: false,
      error: "Validation failed - Check digit is not correct"
    });
  });

  it("returns error when country code is not GB", () => {
    // Serial: 12345678 → check digit = 5
    const result = validateBarcode("AA123456785US");

    expect(result).toEqual({
      valid: false,
      error: "Validation failed - Country code is not GB"
    });
  });

  it("returns valid for a correct barcode", () => {
    // Serial: 12345678
    // Check digit calculation:
    // (1*8 + 2*6 + 3*4 + 4*2 + 5*3 + 6*5 + 7*9 + 8*7) % 11
    // => result = 5
    const result = validateBarcode("AA123456785GB");

    expect(result).toEqual({
      valid: true
    });
  });
});
