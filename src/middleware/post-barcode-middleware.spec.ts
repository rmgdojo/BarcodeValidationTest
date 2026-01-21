import { postbarcodeMiddleware } from "./post-barcode-middleware";

import * as services from "@/services/post-barcode";
import * as barcodeSlice from "@/store/barcode";

jest.mock("../services/post-barcode", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../services/post-barcode"),
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
  const mockPostBarcode = jest.spyOn(services, "postBarcode");
  const mockChangeValue = jest.spyOn(barcodeSlice, "changeValue");
  const mockUpdateHistory = jest.spyOn(barcodeSlice, "updateHistory");

  const inputValue = "sample code";
  const store = {
    getState: jest.fn(() => ({ barcode: { input: inputValue } })),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    mockPostBarcode.mockReset();
    mockChangeValue.mockReset();
    mockUpdateHistory.mockReset();
    next.mockReset();
    store.getState.mockClear();
  });

  it("should access state and clear input value", async () => {
    // arrange
    const action = {
      type: "barcode/submitBarcode",
    };
    mockPostBarcode.mockResolvedValueOnce({
      data: "",
      error: null,
      barcode: inputValue,
      status: "valid",
    });

    // act
    await postbarcodeMiddleware(store)(next)(action);

    // assert
    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(mockChangeValue).toHaveBeenCalledTimes(1);
    expect(mockChangeValue).toHaveBeenCalledWith({ input: "" });
  });

  it("should update history if network request is successfull", async () => {
    // arrange
    const action = {
      type: "barcode/submitBarcode",
    };
    const state = "valid";
    mockPostBarcode.mockResolvedValueOnce({
      data: "",
      error: null,
      barcode: inputValue,
      status: state,
    });

    // act
    await postbarcodeMiddleware(store)(next)(action);

    // assert
    expect(mockUpdateHistory).toHaveBeenCalledTimes(1);
    expect(mockUpdateHistory).toHaveBeenCalledWith({
      barcode: inputValue,
      state,
    });
  });

  it("should update history if network request fails", async () => {
    // arrange
    const action = {
      type: "barcode/submitBarcode",
    };
    const state = "invalid";
    mockPostBarcode.mockRejectedValueOnce({
      data: "",
      error: null,
      barcode: inputValue,
      status: state,
    });

    // act
    await postbarcodeMiddleware(store)(next)(action);

    // assert
    expect(mockUpdateHistory).toHaveBeenCalledTimes(1);
    expect(mockUpdateHistory).toHaveBeenCalledWith({
      barcode: inputValue,
      state,
    });
  });

  it("should continue if action type is not submitBarcode", async () => {
    // arrange
    const action = {
      type: "barcode/changeValue",
    };

    // act
    await postbarcodeMiddleware(store)(next)(action);

    // assert
    expect(store.getState).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
});
