import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TestProviders } from '../../../test-utils/TestProviders';
import { HookForm } from '../HookForm';

describe('HookForm Component', () => {
  it('renders all basic fields', () => {
    render(
      <TestProviders>
        <HookForm />
      </TestProviders>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  it('submit button should be disabled initially (live validation)', () => {
    render(
      <TestProviders>
        <HookForm />
      </TestProviders>
    );
    const submitBtn = screen.getByRole('button', { name: /Save/i });
    expect(submitBtn).toBeDisabled();
  });
});
