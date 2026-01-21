import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Header } from "./header";

describe("Header", () => {
  it("renders a heading", () => {
    // act
    render(<Header />);

    const heading = screen.getByText(/Royal Mail Barcode Validator/i);

    // assert
    expect(heading).toBeInTheDocument();
  });
});
