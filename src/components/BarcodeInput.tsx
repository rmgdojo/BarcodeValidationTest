import React, { useState } from 'react';
import type { ChangeEvent } from 'react';

interface BarcodeInputProps {
  onSubmit: (barcode: string) => boolean;
  onClearMessages: () => void;
  errorMessage: string | null;
  successMessage: string | null;
}

export function BarcodeInput({ onSubmit, onClearMessages, errorMessage, successMessage }: BarcodeInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().trim();
    setInputValue(value);

    // Clear messages when user starts typing
    if (errorMessage || successMessage) {
      onClearMessages();
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = onSubmit(inputValue);
    if (success) {
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="barcode-input" className="block font-bold mb-1">
        Enter Royal Mail Barcode
      </label>
      <p className="text-sm text-gray-600 mb-2">
        Format: 2 letters + 8 digits + check digit + GB (e.g., XH545554533GB)
      </p>
      <input
        type="text"
        id="barcode-input"
        value={inputValue}
        onChange={handleChange}
        placeholder="EG. XH545554533GB"
        maxLength={20}
        className="w-full p-3 text-lg font-mono border-2 border-gray-300 rounded uppercase focus:outline-none focus:border-rm-red"
      />
      <button
        type="submit"
        className="mt-3 px-6 py-3 bg-rm-red text-white font-semibold rounded hover:bg-rm-dark-red"
      >
        Validate Barcode
      </button>

      {errorMessage && (
        <div className="mt-3 p-3 bg-red-50 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mt-3 p-3 bg-green-50 text-green-700 rounded">
          {successMessage}
        </div>
      )}
    </form>
  );
}
