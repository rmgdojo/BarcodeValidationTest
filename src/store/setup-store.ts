import {
  Action,
  Dispatch,
  MiddlewareAPI,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import barcodeReducer from "./barcode";
import notificationReducer from "./notification";

const rootReducer = combineReducers({
  barcode: barcodeReducer,
  notification: notificationReducer,
});

type MiddleWare = (
  api: MiddlewareAPI<Dispatch<Action>, RootState>
) => (next: Dispatch<Action>) => (event: Action) => void;

export const setupStore = (
  preloadedState?: Partial<RootState>,
  middleware: MiddleWare[] = []
) => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(middleware),
    preloadedState,
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
