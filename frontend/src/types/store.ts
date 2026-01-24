import type { HistoryEntry } from './barcode';

/**
 * Validation slice state
 */
export interface ValidationState {
  history: HistoryEntry[];
}

/**
 * UI slice state
 */
export interface UiState {
  notification: {
    message: string;
    type: 'success' | 'error' | 'info';
  } | null;
}

/**
 * Root application state
 */
export interface RootState {
  validation: ValidationState;
  ui: UiState;
}
