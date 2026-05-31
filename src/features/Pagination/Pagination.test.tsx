import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders page buttons and navigates on click', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByRole('button', { name: '<' }));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByRole('button', { name: '>' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('renders ellipsis for large page counts', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />
    );

    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });

  it('renders nothing when totalPages is undefined', () => {
    const { container } = render(
      <Pagination currentPage={1} onPageChange={vi.fn()} />
    );

    expect(container.querySelector('nav')?.children.length).toBe(0);
  });
});
