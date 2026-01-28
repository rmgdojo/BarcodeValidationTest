import type { ValidationEntry } from '../types';
import { StatusIndicator } from './StatusIndicator';

const STATUS_TEXT: Record<ValidationEntry['status'], string> = {
  validating: 'Validating...',
  valid: 'Valid barcode',
  invalid: 'Invalid barcode',
};

const BORDER_COLOR: Record<ValidationEntry['status'], string> = {
  validating: 'border-l-blue-500',
  valid: 'border-l-green-600',
  invalid: 'border-l-red-600',
};

interface ValidationHistoryProps {
  entries: ValidationEntry[];
}

export function ValidationHistory({ entries }: ValidationHistoryProps) {
  if (entries.length === 0) {
    return (
      <p className="text-gray-500 italic">
        No validations yet. Enter a barcode to begin.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Validation History</h2>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={`flex items-center gap-3 p-3 bg-gray-100 rounded border-l-4 ${BORDER_COLOR[entry.status]}`}
          >
            <StatusIndicator status={entry.status} />
            <span className="font-mono font-bold flex-1">{entry.barcode}</span>
            <span className="text-sm text-gray-600">{STATUS_TEXT[entry.status]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
