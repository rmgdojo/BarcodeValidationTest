import React from "react";

type BarcodeFormProps = {
  value: string;
  error: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function BarcodeForm({
  value,
  error,
  onChange,
  onSubmit
}: BarcodeFormProps) {
  const errorId = "barcode-error";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      noValidate
    >
      <label className="barcodeLabelStyle" htmlFor="barcode">
        Your barcode number <span style={{ color: "#DA202A" }}>*</span>
      </label>

      <div className="textContainer">
        <input
          id="barcode"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. XH545554533GB"
          className="textStyle"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          autoComplete="off"
        />

        <button disabled={!value.trim()}
          aria-disabled={!value.trim()} className="validateButtonStyle" type="submit">
          Validate your Barcode
        </button>
      </div>

      {error && (
        <div
          id={errorId}
          className="errorStyle"
          role="alert"
        >
          {error}
        </div>
      )}
    </form>
  );
}
