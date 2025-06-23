import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './card.js';

describe('Card', () => {
  it('should render with children', () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render with title', () => {
    render(<Card title="Test Title">Content</Card>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render with title and subtitle', () => {
    render(<Card title="Test Title" subtitle="Test Subtitle">Content</Card>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('should render with action', () => {
    render(<Card action={<button>Action</button>}>Content</Card>);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should render with footer', () => {
    render(<Card footer={<div>Footer content</div>}>Content</Card>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('should handle click events when clickable', () => {
    const handleClick = jest.fn();
    render(<Card clickable onClick={handleClick}>Clickable card</Card>);
    
    fireEvent.click(screen.getByText('Clickable card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not handle click when not clickable', () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Non-clickable card</Card>);
    
    fireEvent.click(screen.getByText('Non-clickable card'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply correct variant styles', () => {
    const { container } = render(<Card variant="outlined">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ border: '1px solid #ddd6e3' });
  });

  it('should render custom header', () => {
    render(<Card header={<div>Custom header</div>}>Content</Card>);
    expect(screen.getByText('Custom header')).toBeInTheDocument();
  });
});