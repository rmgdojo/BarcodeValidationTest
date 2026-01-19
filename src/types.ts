export type ValidationResult = {
  valid: boolean;
  error?: string;
};

export type HistoryItem = {
  id: number;
  barcode: string;
  status: "Validating..." | "Valid barcode" | "Invalid barcode";
};
