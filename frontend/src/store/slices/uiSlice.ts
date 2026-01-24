import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UiState } from '../../types/store';

const initialState: UiState = {
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Shows a notification
     */
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'success' | 'error' | 'info';
      }>,
    ) => {
      state.notification = action.payload;
    },
    /**
     * Hides the current notification
     */
    hideNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { showNotification, hideNotification } = uiSlice.actions;
export default uiSlice.reducer;
