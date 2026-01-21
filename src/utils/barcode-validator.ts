import { calculateChecksum } from "./calculate-checksum";

const alphabetRegex = /^[A-Z]{2}$/;
const serialNumberRegex = /^[0-9]{8}$/i;
const greatBritainCountryCode = "GB";

export const barcodeValidator = (text = ""): string => {
  const barcode = text.trim();

  if (barcode.length !== 13) {
    return "Validation failed - Barcode is not the correct length";
  }

  const prefix = barcode.substring(0, 2);
  if (!alphabetRegex.test(prefix)) {
    return "Validation failed - Prefix is not in the range AA to ZZ";
  }

  const serialNumber = barcode.substring(2, 10);
  if (!serialNumberRegex.test(serialNumber)) {
    return "Validation failed - Serial number is not in the range 00 000 000 to 99 999 999";
  }

  const checkDigit = barcode[10];
  if (!calculateChecksum(serialNumber, checkDigit)) {
    return "Validation failed - Check digit is not correct";
  }

  const countryCode = barcode.substring(11, barcode.length);
  if (countryCode !== greatBritainCountryCode) {
    return `Validation failed - Country code is not ${greatBritainCountryCode}`;
  }

  return "";
};
