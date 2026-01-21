export type BarcodeValdationState = "validating" | "valid" | "invalid";

export type BarcodeValidationHistory = {
  barcode: string;
  state: BarcodeValdationState;
};
