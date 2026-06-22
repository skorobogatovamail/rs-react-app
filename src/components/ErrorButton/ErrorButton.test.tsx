import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TestProviders } from '../../test-utils/TestProviders';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { ErrorButton } from './ErrorButton';

describe('ErrorButton Component', () => {
  it('throws error when test button is clicked', () => {
    // Suppress console.error for this test as we expect an error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TestProviders>
        <ErrorBoundary fallback={<div>Fallback UI</div>}>
          <ErrorButton />
        </ErrorBoundary>
      </TestProviders>
    );

    // Mock useTranslations returns the key
    const button = screen.getByRole('button', { name: 'throwError' });
    fireEvent.click(button);

    expect(screen.getByText('Fallback UI')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
