import { configureStore } from '@reduxjs/toolkit';
import validationReducer from './slices/validationSlice';
import uiReducer from './slices/uiSlice';
import type { RootState } from '../types/store';

export const store = configureStore({
  reducer: {
    validation: validationReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };
