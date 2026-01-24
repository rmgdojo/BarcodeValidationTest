import type { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

/**
 * Label atom component
 * Follows Single Responsibility Principle - only handles label rendering
 */
export function Label({ children, required = false, className = '', ...props }: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
    </label>
  );
}
