import { useState, type FormEvent } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { useBarcodeValidation } from '../../hooks/useBarcodeValidation';

/**
 * BarcodeInputForm organism component
 * Complete form for barcode input and validation
 * Follows Single Responsibility Principle - handles form submission and validation
 */
export function BarcodeInputForm() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | undefined>();
  const { validateBarcode, isSubmitting } = useBarcodeValidation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
    // Clear error when user starts typing
    if (error) {
      setError(undefined);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);

    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      setError('Please enter a barcode');
      return;
    }

    const result = await validateBarcode(trimmedValue);
    
    if (result.success) {
      // Clear input on successful validation
      setInputValue('');
    } else {
      // Keep input value and show error
      setError(result.error ?? 'Validation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField
        id="barcode-input"
        label="Barcode"
        required
        value={inputValue}
        onChange={handleInputChange}
        error={error}
        hint="Enter a 13-character Royal Mail barcode (e.g., XH545554533GB)"
        placeholder="EG. XH545554533GB"
        disabled={isSubmitting}
        maxLength={13}
        autoComplete="off"
        autoFocus
        aria-describedby={error ? 'barcode-input-error' : 'barcode-input-hint'}
      />
      <Button
        type="submit"
        disabled={isSubmitting || !inputValue.trim()}
        className="w-full"
        aria-label="Validate barcode"
      >
        {isSubmitting ? 'Validating...' : 'Validate Barcode'}
      </Button>
    </form>
  );
}
