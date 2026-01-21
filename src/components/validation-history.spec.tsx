import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { ValidationHistory } from "./validation-history";

import { renderWithProviders } from "@/utils/test-utils";

beforeEach(() => {
  // act
  renderWithProviders(<ValidationHistory />, {
    preloadedState: {
      barcode: {
        error: "",
        input: "",
        validationHistory: [
          { barcode: "AB473124829GB", state: "valid" },
          { barcode: "XH545554533GB", state: "validating" },
          { barcode: "ZZ999999990GB", state: "invalid" },
        ],
      },
    },
  });
});
describe("ValidationHistory", () => {
  it("should render 3 barcodes", () => {
    // assert
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  it("should ensure each barcode matches their displayed state", () => {
    // arrange
    const expectedStates = [
      { barcode: "AB473124829GB", state: "Valid barcode" },
      { barcode: "XH545554533GB", state: "Validating..." },
      { barcode: "ZZ999999990GB", state: "Invalid barcode" },
    ];

    // assert
    const listItems = screen.getAllByRole("listitem");
    for (let i = 0; i < listItems.length; i++) {
      expect(listItems[i]).toHaveTextContent(expectedStates[i].barcode);
      expect(listItems[i]).toHaveTextContent(expectedStates[i].state);
    }
  });
});
