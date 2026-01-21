import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  render: false,
};

type InitialState = {
  render: boolean;
};

export const barcodeSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    renderToast: (store, { payload }: PayloadAction<{ render: boolean }>) => {
      const { render } = payload;
      store.render = render;
    },
  },
});

export const { renderToast } = barcodeSlice.actions;

export default barcodeSlice.reducer;
