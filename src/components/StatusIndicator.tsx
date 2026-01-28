import type { ValidationStatus } from '../types';

interface StatusIndicatorProps {
  status: ValidationStatus;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  switch (status) {
    case 'validating':
      return <span>⏳</span>;
    case 'valid':
      return <span>✓</span>;
    case 'invalid':
      return <span>✗</span>;
  }
}
