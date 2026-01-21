import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

import { BarcodeValidator } from "./barcode-validator";

import { renderWithProviders } from "@/utils/test-utils";

beforeEach(() => {
  // act
  renderWithProviders(<BarcodeValidator />, {
    preloadedState: {
      barcode: {
        error: "",
        input: "",
        validationHistory: [],
      },
    },
  });
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("BarcodeValidator", () => {
  it("should not render an error if validation passes", async () => {
    // arrange
    const validBarcode = "AA000000005GB";
    const input = screen.getByLabelText(/Barcode input/i);
    const button = screen.getByTestId(/validate-button/i);

    // act
    fireEvent.change(input, { target: { value: validBarcode } });
    fireEvent.click(button);
    jest.runAllTimers();

    // assert
    const span = screen.queryByText(
      /Validation failed - Barcode is not the correct length/i
    );

    expect(span).not.toBeInTheDocument();
  });

  it("should paste a sample valid barcode into the input field", () => {
    // arrange
    const button = screen.getByRole("button", { name: "AB473124829GB" });
    const input = screen.getByLabelText(/Barcode input/i);

    // act
    fireEvent.click(button);

    // assert
    expect(input).toHaveValue("AB473124829GB");
  });

  it("should render an error if validation fails", async () => {
    // arrange
    const invalidBarcode = "AB47314829GB";
    const input = screen.getByLabelText(/Barcode input/i);
    const button = screen.getByTestId(/validate-button/i);

    // act
    fireEvent.change(input, { target: { value: invalidBarcode } });
    fireEvent.click(button);

    // assert
    jest.runAllTimers();
    const span = screen.getByText(
      /Validation failed - Barcode is not the correct length/i
    );

    expect(span).toBeInTheDocument();
  });
});
