import { describe, it, expect } from 'vitest';
import uiReducer, { showNotification, hideNotification } from './uiSlice';
import type { UiState } from '../../types/store';

describe('uiSlice', () => {
  const initialState: UiState = {
    notification: null,
  };

  it('should return initial state', () => {
    expect(uiReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should show a success notification', () => {
    const action = showNotification({
      message: 'Success message',
      type: 'success',
    });
    const state = uiReducer(initialState, action);

    expect(state.notification).toEqual({
      message: 'Success message',
      type: 'success',
    });
  });

  it('should show an error notification', () => {
    const action = showNotification({
      message: 'Error message',
      type: 'error',
    });
    const state = uiReducer(initialState, action);

    expect(state.notification).toEqual({
      message: 'Error message',
      type: 'error',
    });
  });

  it('should show an info notification', () => {
    const action = showNotification({
      message: 'Info message',
      type: 'info',
    });
    const state = uiReducer(initialState, action);

    expect(state.notification).toEqual({
      message: 'Info message',
      type: 'info',
    });
  });

  it('should hide notification', () => {
    const showAction = showNotification({
      message: 'Test message',
      type: 'success',
    });
    const stateWithNotification = uiReducer(initialState, showAction);

    const hideAction = hideNotification();
    const stateAfterHide = uiReducer(stateWithNotification, hideAction);

    expect(stateAfterHide.notification).toBeNull();
  });

  it('should replace existing notification', () => {
    const action1 = showNotification({
      message: 'First message',
      type: 'success',
    });
    const state1 = uiReducer(initialState, action1);

    const action2 = showNotification({
      message: 'Second message',
      type: 'error',
    });
    const state2 = uiReducer(state1, action2);

    expect(state2.notification).toEqual({
      message: 'Second message',
      type: 'error',
    });
  });
});
