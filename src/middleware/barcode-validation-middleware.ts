import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

import { appendHistory, setError } from "@/store/barcode";
import { renderToast } from "@/store/notification";
import { barcodeValidator } from "@/utils/barcode-validator";

type BarcodeValidationMiddleware = (
  api: MiddlewareAPI<Dispatch<Action>, { barcode: { input: string } }>
) => (next: Dispatch<Action>) => (event: Action) => void;

export const barcodeValidationMiddleware: BarcodeValidationMiddleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    if (action.type !== "barcode/submitBarcode") {
      return next(action);
    }

    const { input } = getState().barcode;
    const error = barcodeValidator(input);
    if (error) {
      dispatch(setError({ error }));
    } else {
      dispatch(setError({ error: "" }));
      dispatch(appendHistory({ barcode: input }));
      dispatch(renderToast({ render: true }));
      next(action);
    }
  };
