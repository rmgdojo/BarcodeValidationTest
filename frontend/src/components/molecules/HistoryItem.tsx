import type { HistoryEntry } from '../../types/barcode';
import { StatusBadge } from '../atoms/StatusBadge';

interface HistoryItemProps {
  entry: HistoryEntry;
}

/**
 * HistoryItem molecule component
 * Displays a single validation history entry
 * Follows Single Responsibility Principle - handles single history item display
 */
export function HistoryItem({ entry }: HistoryItemProps) {
  return (
    <li
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      aria-label={`Barcode ${entry.barcode} - ${entry.status}`}
    >
      <div className="flex-1">
        <p className="font-mono text-lg font-semibold text-gray-900 mb-1">
          {entry.barcode}
        </p>
        {entry.error && (
          <p className="text-sm text-red-600 mt-1" role="alert">
            {entry.error}
          </p>
        )}
      </div>
      <div className="ml-4">
        <StatusBadge status={entry.status} />
      </div>
    </li>
  );
}
