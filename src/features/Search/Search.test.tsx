import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Search } from './Search';

describe('Search Component', () => {
  it('renders search input and search button', () => {
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const onRefresh = vi.fn();
    render(
      <Search
        value=""
        onChange={onChange}
        onSubmit={onSubmit}
        onRefresh={onRefresh}
      />
    );

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const onRefresh = vi.fn();
    render(
      <Search
        value=""
        onChange={onChange}
        onSubmit={onSubmit}
        onRefresh={onRefresh}
      />
    );

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(onChange).toHaveBeenCalledWith('Rick');
  });

  it('triggers search callback when search button is clicked', () => {
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const onRefresh = vi.fn();
    render(
      <Search
        value="Rick"
        onChange={onChange}
        onSubmit={onSubmit}
        onRefresh={onRefresh}
      />
    );

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalled();
  });
});
