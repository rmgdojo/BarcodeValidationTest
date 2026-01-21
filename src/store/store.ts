import logger from "redux-logger";

import { setupStore } from "./setup-store";

import { barcodeValidationMiddleware } from "@/middleware/barcode-validation-middleware";
import { postbarcodeMiddleware } from "@/middleware/post-barcode-middleware";

export const store = setupStore(
  {
    barcode: {
      error: "",
      input: "",
      validationHistory: [],
    },
    notification: {
      render: false,
    },
  },
  [barcodeValidationMiddleware, postbarcodeMiddleware]
);
