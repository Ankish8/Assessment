import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button.js';

describe('Button', () => {
  it('should render with children', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not handle click when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply correct variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByText('Primary');
    expect(button).toHaveStyle({ backgroundColor: '#611F69' });

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByText('Secondary');
    expect(button).toHaveStyle({ backgroundColor: '#ffffff' });

    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByText('Ghost');
    expect(button).toHaveStyle({ backgroundColor: 'transparent' });
  });

  it('should apply correct size styles', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    let button = screen.getByText('Small');
    expect(button).toHaveStyle({ height: '32px' });

    rerender(<Button size="medium">Medium</Button>);
    button = screen.getByText('Medium');
    expect(button).toHaveStyle({ height: '40px' });

    rerender(<Button size="large">Large</Button>);
    button = screen.getByText('Large');
    expect(button).toHaveStyle({ height: '48px' });
  });
});