import { useAppSelector } from '../../store/hooks';
import { HistoryItem } from '../molecules/HistoryItem';

/**
 * ValidationHistoryList organism component
 * Displays all validation history entries
 * Follows Single Responsibility Principle - handles history list display
 */
export function ValidationHistoryList() {
  const history = useAppSelector((state) => state.validation.history);

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500" role="status" aria-live="polite">
        <p>No validation history yet. Submit a barcode to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" role="list" aria-label="Validation history">
      {history.map((entry) => (
        <HistoryItem key={entry.id} entry={entry} />
      ))}
    </ul>
  );
}
