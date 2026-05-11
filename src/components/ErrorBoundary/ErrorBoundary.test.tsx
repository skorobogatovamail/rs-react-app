import { render, screen } from '@testing-library/react';
import { Component } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ErrorBoundary } from './ErrorBoundary';

class ErrorComponent extends Component {
  render() {
    throw new Error('Test error');
    return null;
  }
}

describe('ErrorBoundary Component', () => {
  it('catches and handles JavaScript errors in child components', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<div>Fallback UI</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Fallback UI')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary fallback={<div>Fallback UI</div>}>
        <div>Child content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
    expect(screen.queryByText('Fallback UI')).not.toBeInTheDocument();
  });
});
