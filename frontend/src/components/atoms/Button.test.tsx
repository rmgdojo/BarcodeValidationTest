import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should apply primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-royal-mail-red');
  });

  it('should apply secondary variant', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-gray-200');
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });
});
