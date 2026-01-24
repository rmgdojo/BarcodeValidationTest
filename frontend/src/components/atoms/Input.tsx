import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

/**
 * Input atom component
 * Follows Single Responsibility Principle - only handles input rendering
 */
export function Input({ hasError = false, className = '', ...props }: InputProps) {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const errorClasses = hasError
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-royal-mail-red focus:border-royal-mail-red';

  return (
    <input
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
}
