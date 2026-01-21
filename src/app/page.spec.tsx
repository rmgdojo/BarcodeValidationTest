import "@testing-library/jest-dom";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import Page from "./page";

import { renderWithProviders } from "@/utils/test-utils";

beforeEach(() => {
  // arrange
  jest.useFakeTimers();

  // act
  act(() => {
    renderWithProviders(<Page />, {
      preloadedState: {
        barcode: {
          error: "",
          input: "",
          validationHistory: [],
        },
      },
    });
  });
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const addBarcodes = (barcodes: string[]) => {
  const input = screen.getByLabelText(/Barcode input/i);
  const button = screen.getByTestId(/validate-button/i);

  for (const barcode of barcodes) {
    fireEvent.change(input, { target: { value: barcode } });
    (async () => {
      await waitFor(() => {
        fireEvent.click(button);
      });
    })();
  }

  return [input, button];
};

describe("Page", () => {
  it("should render a disabled validate button if input field is empty", () => {
    // arrange
    const button = screen.getByTestId(/validate-button/i);

    // assert
    expect(button).toBeDisabled();
  });

  it("should render an enabled validate button if input field is not empty", () => {
    // arrange
    const input = screen.getByLabelText(/Barcode input/i);
    const button = screen.getByTestId(/validate-button/i);

    // act
    fireEvent.change(input, { target: { value: "AA000000005GB" } });

    // assert
    expect(button).toBeEnabled();
  });

  it("should render 3 barcodes", async () => {
    // arrange
    const barcodes = ["AB473124829GB", "XH545554533GB", "AA000000005GB"];

    // act
    addBarcodes(barcodes);
    await jest.advanceTimersByTimeAsync(30_000);

    // assert
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  it("should not render an error if validation passes", async () => {
    // arrange
    const validBarcode = "AA000000005GB";

    // act
    addBarcodes([validBarcode]);

    // assert
    const errorField = screen.queryByTestId("error-field");

    expect(errorField).not.toBeInTheDocument();
  });

  it("should render an error if validation fails", async () => {
    // arrange
    const invalidBarcode = "AB47314829GB";

    // act
    addBarcodes([invalidBarcode]);

    // assert
    jest.runAllTimers();
    const span = screen.getByText(
      /Validation failed - Barcode is not the correct length/i
    );

    expect(span).toBeInTheDocument();
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
});
