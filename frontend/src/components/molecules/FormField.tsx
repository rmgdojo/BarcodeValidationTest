import type { InputHTMLAttributes, ReactNode } from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
}

/**
 * FormField molecule component
 * Composes Input and Label atoms
 * Follows Single Responsibility Principle - handles form field with label and error
 */
export function FormField({
  id,
  label,
  error,
  hint,
  required = false,
  className = '',
  ...inputProps
}: FormFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {hint && (
        <p className="text-sm text-gray-500 mb-1" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      <Input
        id={id}
        hasError={Boolean(error)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...inputProps}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
