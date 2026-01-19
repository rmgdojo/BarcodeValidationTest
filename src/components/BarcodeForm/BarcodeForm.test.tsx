import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import BarcodeForm from "./barcodeForm";

function TestWrapper({
  onSubmit,
  onChange
}: {
  onSubmit: jest.Mock;
  onChange: jest.Mock;
}) {
  const [value, setValue] = useState("");

  return (
    <BarcodeForm
      value={value}
      error={null}
      onChange={(v) => {
        setValue(v);
        onChange(v);
      }}
      onSubmit={onSubmit}
    />
  );
}

describe("BarcodeForm", () => {
  it("calls onChange and onSubmit", async () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(<TestWrapper onChange={onChange} onSubmit={onSubmit} />);

    const input = screen.getByLabelText(/barcode number/i);
    const button = screen.getByRole("button", {
      name: /validate your barcode/i
    });

    await userEvent.type(input, "AA123");

    expect(onChange).toHaveBeenCalled();

    await userEvent.click(button);

    expect(onSubmit).toHaveBeenCalled();
  });
});
