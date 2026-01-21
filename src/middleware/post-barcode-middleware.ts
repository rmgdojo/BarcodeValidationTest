import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

import { postBarcode } from "@/services/post-barcode";
import { changeValue, updateHistory } from "@/store/barcode";

const controllerCache = new Map<string, AbortController>();

type PostbarcodeMiddleware = (
  api: MiddlewareAPI<Dispatch<Action>, { barcode: { input: string } }>
) => (next: Dispatch<Action>) => (event: Action) => void;

export const postbarcodeMiddleware: PostbarcodeMiddleware =
  ({ dispatch, getState }) =>
  next =>
  async action => {
    if (action.type !== "barcode/submitBarcode") {
      return next(action);
    }

    const { input } = getState().barcode;
    const formData = new FormData();
    formData.append("barcode", input);

    /**
     * Attempts to abort duplicate in-flight requests.
     * Where a real network request exists, cancellation
     * can be handled using AbortSignal.timeout.
     * As an alternative, a timeout-driven approach may be implemented
     * using window.setTimeout.
     */
    const controller = new AbortController();
    if (controllerCache.has(input)) {
      controllerCache.get(input).abort("Duplicate Barcode");
    }
    controllerCache.set(input, controller);

    dispatch(changeValue({ input: "" }));

    try {
      const { barcode, status } = await postBarcode(formData, {
        signal: controller.signal,
      });

      dispatch(updateHistory({ barcode, state: status }));
    } catch (error) {
      const { barcode, status } = error;
      dispatch(updateHistory({ barcode, state: status }));
    } finally {
      /**
       * Delete unused abort controllers
       */
      controllerCache.delete(input);
      next(action);
    }
  };
