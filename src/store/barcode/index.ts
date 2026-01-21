import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { BarcodeValidationHistory } from "@/types";

const allowedCharactersRegex = /^[a-z0-9]+$/i;
const initialState: InitialState = {
  error: "",
  input: "",
  validationHistory: [],
};

type InitialState = {
  error: string;
  input: string;
  validationHistory: BarcodeValidationHistory[];
};

export const barcodeSlice = createSlice({
  name: "barcode",
  initialState,
  reducers: {
    appendHistory: (
      store,
      { payload }: PayloadAction<Pick<BarcodeValidationHistory, "barcode">>
    ) => {
      const { barcode } = payload;
      const index = store.validationHistory.findIndex(
        value => value.barcode === barcode
      );

      if (index === -1) {
        store.validationHistory.push({ barcode, state: "validating" });
      } else {
        store.validationHistory[index].state = "validating";
      }
    },
    changeValue: (store, { payload }: PayloadAction<{ input: string }>) => {
      const { input } = payload;

      if (allowedCharactersRegex.test(input) || !input) {
        store.input = input.toUpperCase().trim();
      }
    },
    clearHistory: store => {
      store.validationHistory = [];
    },
    setError: (store, { payload }: PayloadAction<{ error: string }>) => {
      const { error } = payload;
      store.error = error;
    },
    updateHistory: (
      store,
      { payload }: PayloadAction<BarcodeValidationHistory>
    ) => {
      const { barcode, state } = payload;
      const index = store.validationHistory.findIndex(
        value => value.barcode === barcode
      );
      store.validationHistory[index].state = state;
    },
    submitBarcode: () => {},
  },
});

export const {
  appendHistory,
  changeValue,
  clearHistory,
  setError,
  updateHistory,
  submitBarcode,
} = barcodeSlice.actions;

export default barcodeSlice.reducer;
