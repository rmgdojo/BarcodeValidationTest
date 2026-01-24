import type { ValidationStatus } from '../../types/barcode';
import { StatusBadge } from '../atoms/StatusBadge';

interface ValidationStatusProps {
  status: ValidationStatus;
  message?: string;
  className?: string;
}

/**
 * ValidationStatus molecule component
 * Displays validation status with optional message
 * Follows Single Responsibility Principle - handles status display
 */
export function ValidationStatusDisplay({
  status,
  message,
  className = '',
}: ValidationStatusProps) {
  return (
    <div className={className}>
      <StatusBadge status={status} />
      {message && (
        <p className="mt-2 text-sm text-gray-600" role="status" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}
