interface IconProps {
  type: 'check' | 'error' | 'info';
  className?: string;
  'aria-label'?: string;
}

/**
 * Icon atom component
 * Follows Single Responsibility Principle - only handles icon rendering
 */
export function Icon({ type, className = '', 'aria-label': ariaLabel }: IconProps) {
  const icons = {
    check: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-label={ariaLabel}
        role="img"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    error: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-label={ariaLabel}
        role="img"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    info: (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-label={ariaLabel}
        role="img"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return icons[type];
}
