import { renderHook, act, waitFor } from "@testing-library/react";
import { useBarcodeValidating } from "./useBarcodeValidating";
import * as mockService from "../services/mockApi";
import * as barcodeUtils from "../utils/Barcode";

// Mock the async API
jest.mock("../services/mockApi");

describe("useBarcodeValidating hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize state correctly", () => {
    const { result } = renderHook(() => useBarcodeValidating());

    expect(result.current.input).toBe("");
    expect(result.current.error).toBeNull();
    expect(result.current.history).toEqual([]);
    expect(result.current.toast).toBeNull();
  });

  it("should set error for invalid barcode", () => {
    // Mock validateBarcode to fail
    jest.spyOn(barcodeUtils, "validateBarcode").mockReturnValue({
      valid: false,
      error: "Invalid barcode"
    });

    const { result } = renderHook(() => useBarcodeValidating());

    act(() => {
      result.current.setInput("INVALID");
      result.current.submit();
    });

    expect(result.current.error).toBe("Invalid barcode");
    expect(result.current.history).toHaveLength(0);
    expect(result.current.toast).toBeNull();
  });

  it("should add to history and set toast on successful validation", async () => {
    jest.spyOn(barcodeUtils, "validateBarcode").mockReturnValue({ valid: true });
    jest.spyOn(mockService, "mockApi").mockResolvedValue(undefined);

    const { result } = renderHook(() => useBarcodeValidating());

    act(() => {
      result.current.setInput("AA12345678XGB");
      result.current.submit();
    });

    // Immediate state
    expect(result.current.history[0].status).toBe("Validating...");

    // Wait for async resolution
    await waitFor(() => {
      expect(result.current.history[0].status).toBe("Valid barcode");
    });

    expect(result.current.toast).toEqual({
      message: "Barcode number validated successfully",
      type: "success"
    });
  });

  it("should set error toast on API failure", async () => {
  jest.spyOn(barcodeUtils, "validateBarcode").mockReturnValue({ valid: true });
  jest.spyOn(mockService, "mockApi").mockRejectedValue(undefined);

  const { result } = renderHook(() => useBarcodeValidating());

  act(() => {
    result.current.setInput("AA12345678XGB");
    result.current.submit();
  });

  expect(result.current.history[0].status).toBe("Validating...");

  await waitFor(() => {
    expect(result.current.history[0].status).toBe("Invalid barcode");
  });

  expect(result.current.toast).toMatchObject({
    type: "error"
  });

  expect(result.current.toast?.message).toContain(
    "failed server validation"
  );
});

  it("should clear toast", () => {
    const { result } = renderHook(() => useBarcodeValidating());

    act(() => {
      result.current.setInput("AA12345678XGB");
      result.current.submit();
      result.current.clearToast();
    });

    expect(result.current.toast).toBeNull();
  });
});
