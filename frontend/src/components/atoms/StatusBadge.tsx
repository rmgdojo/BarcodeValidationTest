import type { ValidationStatus } from '../../types/barcode';
import { Icon } from './Icon';
import { Spinner } from './Spinner';

interface StatusBadgeProps {
  status: ValidationStatus;
  className?: string;
}

/**
 * StatusBadge atom component
 * Follows Single Responsibility Principle - only handles status badge rendering
 */
export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    validating: {
      text: 'Validating...',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      icon: <Spinner size="sm" aria-label="Validating" />,
    },
    valid: {
      text: 'Valid barcode',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      icon: <Icon type="check" className="w-4 h-4" aria-label="Valid" />,
    },
    invalid: {
      text: 'Invalid barcode',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      icon: <Icon type="error" className="w-4 h-4" aria-label="Invalid" />,
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor} ${className}`}
      role="status"
      aria-live="polite"
    >
      {config.icon}
      {config.text}
    </span>
  );
}
