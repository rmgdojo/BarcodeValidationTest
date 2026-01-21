import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";

import React from "react";

import { barcodeValidationMiddleware } from "@/middleware/barcode-validation-middleware";
import { postbarcodeMiddleware } from "@/middleware/post-barcode-middleware";
import { AppStore, RootState, setupStore } from "@/store/setup-store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState, [
      barcodeValidationMiddleware,
      postbarcodeMiddleware,
    ]),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({
    children,
  }: React.PropsWithChildren<{}>): React.JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
