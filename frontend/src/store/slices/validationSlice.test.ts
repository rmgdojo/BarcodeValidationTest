import { describe, it, expect } from 'vitest';
import validationReducer, { addValidation, updateValidationStatus } from './validationSlice';
import type { ValidationState } from '../../types/store';

describe('validationSlice', () => {
  const initialState: ValidationState = {
    history: [],
  };

  it('should return initial state', () => {
    expect(validationReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add a validation entry', () => {
    const action = addValidation({ barcode: 'AB473124829GB' });
    const state = validationReducer(initialState, action);

    expect(state.history).toHaveLength(1);
    expect(state.history[0]?.barcode).toBe('AB473124829GB');
    expect(state.history[0]?.status).toBe('validating');
    expect(state.history[0]?.id).toBeDefined();
    expect(state.history[0]?.timestamp).toBeDefined();
  });

  it('should add validation entry with custom ID', () => {
    const customId = 'test-id-123';
    const action = addValidation({ barcode: 'AB473124829GB', id: customId });
    const state = validationReducer(initialState, action);

    expect(state.history[0]?.id).toBe(customId);
  });

  it('should update validation status', () => {
    const addAction = addValidation({ barcode: 'AB473124829GB', id: 'test-id' });
    const stateAfterAdd = validationReducer(initialState, addAction);

    const updateAction = updateValidationStatus({
      id: 'test-id',
      status: 'valid',
    });
    const stateAfterUpdate = validationReducer(stateAfterAdd, updateAction);

    expect(stateAfterUpdate.history[0]?.status).toBe('valid');
  });

  it('should update validation status with error', () => {
    const addAction = addValidation({ barcode: 'AB473124829GB', id: 'test-id' });
    const stateAfterAdd = validationReducer(initialState, addAction);

    const updateAction = updateValidationStatus({
      id: 'test-id',
      status: 'invalid',
      error: 'Test error message',
    });
    const stateAfterUpdate = validationReducer(stateAfterAdd, updateAction);

    expect(stateAfterUpdate.history[0]?.status).toBe('invalid');
    expect(stateAfterUpdate.history[0]?.error).toBe('Test error message');
  });

  it('should not update non-existent entry', () => {
    const updateAction = updateValidationStatus({
      id: 'non-existent-id',
      status: 'valid',
    });
    const state = validationReducer(initialState, updateAction);

    expect(state.history).toHaveLength(0);
  });

  it('should handle multiple concurrent validations', () => {
    const action1 = addValidation({ barcode: 'AB473124829GB', id: 'id-1' });
    const state1 = validationReducer(initialState, action1);

    const action2 = addValidation({ barcode: 'XH545554533GB', id: 'id-2' });
    const state2 = validationReducer(state1, action2);

    expect(state2.history).toHaveLength(2);

    const updateAction1 = updateValidationStatus({
      id: 'id-1',
      status: 'valid',
    });
    const state3 = validationReducer(state2, updateAction1);

    expect(state3.history[0]?.status).toBe('valid');
    expect(state3.history[1]?.status).toBe('validating');

    const updateAction2 = updateValidationStatus({
      id: 'id-2',
      status: 'invalid',
      error: 'Invalid barcode',
    });
    const state4 = validationReducer(state3, updateAction2);

    expect(state4.history[0]?.status).toBe('valid');
    expect(state4.history[1]?.status).toBe('invalid');
    expect(state4.history[1]?.error).toBe('Invalid barcode');
  });
});
