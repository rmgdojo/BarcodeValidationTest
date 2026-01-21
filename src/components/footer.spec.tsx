import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Footer } from "./footer";

describe("Footer", () => {
  it("renders a footer", () => {
    // act
    render(<Footer />);

    const footer = screen.getByText(/© Royal Mail Group Limited 2025/i);

    // assert
    expect(footer).toBeInTheDocument();
  });
});
