import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TestProviders } from '../../test-utils/TestProviders';
import { Search } from './Search';

describe('Search Component', () => {
  it('renders search input and search button', () => {
    render(
      <TestProviders>
        <Search value="" onChange={vi.fn()} />
      </TestProviders>
    );

    expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'search' })).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    const onChange = vi.fn();
    render(
      <TestProviders>
        <Search value="" onChange={onChange} />
      </TestProviders>
    );

    const input = screen.getByPlaceholderText('placeholder');
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(onChange).toHaveBeenCalledWith('Rick');
  });
});
