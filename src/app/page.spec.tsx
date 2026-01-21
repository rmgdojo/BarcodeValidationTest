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
};

describe("Page", () => {
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

  it("should not render an error if validation passes", async () => {
    // arrange
    const validBarcode = "AA000000005GB";

    // act
    addBarcodes([validBarcode]);

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

  it("should render 3 barcodes", () => {
    // arrange
    const barcodes = ["AB473124829GB", "XH545554533GB", "AA000000005GB"];

    // act
    addBarcodes(barcodes);
    jest.runAllTimers();

    // assert
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });
});
