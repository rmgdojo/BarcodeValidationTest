import { useState, useCallback } from 'react';
import { BarcodeInput, ValidationHistory } from './components';
import { validateBarcode, normalizeBarcode, mockApiValidation } from './validation';
import type { ValidationEntry } from './types';
import './index.css';

function App() {
  const [entries, setEntries] = useState<ValidationEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateEntryStatus = useCallback((id: string, status: ValidationEntry['status']) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, status } : entry
      )
    );
  }, []);

  const performApiValidation = useCallback(
    async (id: string, barcode: string) => {
      try {
        await mockApiValidation(barcode);
        updateEntryStatus(id, 'valid');
      } catch {
        updateEntryStatus(id, 'invalid');
      }
    },
    [updateEntryStatus]
  );

  const handleClearMessages = useCallback(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  const handleSubmit = useCallback(
    (input: string): boolean => {
      setErrorMessage(null);
      setSuccessMessage(null);

      const barcode = normalizeBarcode(input);
      const result = validateBarcode(barcode);

      if (!result.isValid) {
        setErrorMessage(result.errorMessage || 'Validation failed');
        return false;
      }

      setSuccessMessage('Pre-validation passed! Sending to server...');

      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      const newEntry: ValidationEntry = {
        id,
        barcode,
        status: 'validating',
        timestamp: Date.now(),
      };

      setEntries((prevEntries) => [newEntry, ...prevEntries]);
      performApiValidation(id, barcode);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);

      return true;
    },
    [performApiValidation]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-rm-red text-white p-4 mb-6">
        <h1 className="text-xl font-semibold max-w-xl mx-auto">
          Royal Mail Barcode Validation
        </h1>
      </header>

      <main className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-lg p-5 mb-5 shadow">
          <BarcodeInput
            onSubmit={handleSubmit}
            onClearMessages={handleClearMessages}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </div>

        <div className="bg-white rounded-lg p-5 shadow">
          <ValidationHistory entries={entries} />
        </div>
      </main>
    </div>
  );
}

export default App;
