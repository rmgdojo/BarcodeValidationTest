import { barcodeValidationMiddleware } from "./barcode-validation-middleware";

import * as barcodeSlice from "@/store/barcode";
import * as notificationSlice from "@/store/notification";
import * as utils from "@/utils/barcode-validator";

jest.mock("../utils/barcode-validator", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../utils/barcode-validator"),
  };
});

jest.mock("../store/barcode", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../store/barcode"),
  };
});

jest.mock("../store/notification", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../store/notification"),
  };
});

describe("barcodeValidationMiddleware", () => {
  const mockValidator = jest.spyOn(utils, "barcodeValidator");
  const mockSetError = jest.spyOn(barcodeSlice, "setError");
  const mockAppendHistory = jest.spyOn(barcodeSlice, "appendHistory");
  const mockRenderToast = jest.spyOn(notificationSlice, "renderToast");

  const inputValue = "sample code";
  const store = {
    getState: jest.fn(() => ({ barcode: { input: inputValue } })),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    mockValidator.mockReset();
    mockSetError.mockReset();
    mockAppendHistory.mockReset();
    mockRenderToast.mockReset();
    next.mockReset();
    store.getState.mockClear();
  });

  it("should access state and call barcode validator", () => {
    // arrange
    const action = {
      type: "barcode/submitBarcode",
    };
    mockValidator.mockReturnValueOnce("");

    // act
    barcodeValidationMiddleware(store)(next)(action);

    // assert
    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(mockValidator).toHaveBeenCalledTimes(1);
    expect(mockValidator).toHaveBeenCalledWith(inputValue);
  });

  it("should call set error action creator if validation fails", () => {
    // arrange
    const action = {
      type: "barcode/submitBarcode",
    };
    const error = "Validation failed";
    mockValidator.mockReturnValueOnce(error);

    // act
    barcodeValidationMiddleware(store)(next)(action);

    // assert
    expect(mockSetError).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledWith({ error });
  });

  it("should call append history, clear error and render toast action creators if validation passes", () => {
    // arrange
    const action = {
      type: "barcode/submitBarcode",
    };
    mockValidator.mockReturnValueOnce("");

    // act
    barcodeValidationMiddleware(store)(next)(action);

    // assert
    expect(mockAppendHistory).toHaveBeenCalledTimes(1);
    expect(mockAppendHistory).toHaveBeenCalledWith({ barcode: inputValue });
    expect(mockSetError).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledWith({ error: "" });
    expect(mockRenderToast).toHaveBeenCalledTimes(1);
    expect(mockRenderToast).toHaveBeenCalledWith({ render: true });
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  it("should continue if action type is not submitBarcode", () => {
    // arrange
    const action = {
      type: "barcode/changeValue",
    };
    mockValidator.mockReturnValueOnce("");

    // act
    barcodeValidationMiddleware(store)(next)(action);

    // assert
    expect(store.getState).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
});
