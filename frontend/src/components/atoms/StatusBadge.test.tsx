import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('should render validating status', () => {
    render(<StatusBadge status="validating" />);
    expect(screen.getByText('Validating...')).toBeInTheDocument();
    expect(screen.getByLabelText('Validating')).toBeInTheDocument();
  });

  it('should render valid status', () => {
    render(<StatusBadge status="valid" />);
    expect(screen.getByText('Valid barcode')).toBeInTheDocument();
    expect(screen.getByLabelText('Valid')).toBeInTheDocument();
  });

  it('should render invalid status', () => {
    render(<StatusBadge status="invalid" />);
    expect(screen.getByText('Invalid barcode')).toBeInTheDocument();
    expect(screen.getByLabelText('Invalid')).toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(<StatusBadge status="valid" />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-live', 'polite');
  });
});
