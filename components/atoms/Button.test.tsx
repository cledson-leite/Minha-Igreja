import { render, screen } from '@testing-library/react';
import { Button } from '@/components/atoms/Button';

describe('Button Component', () => {
  it('renders correctly with label', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });
});
