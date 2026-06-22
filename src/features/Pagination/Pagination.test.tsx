import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TestProviders } from '../../test-utils/TestProviders';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders page links correctly', () => {
    render(
      <TestProviders>
        <Pagination currentPage={2} totalPages={5} baseUrl="/" query="test" />
      </TestProviders>
    );

    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute(
      'href',
      '/en?query=test&page=1'
    );
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute(
      'href',
      '/en?query=test&page=3'
    );
    expect(screen.getByRole('link', { name: '<' })).toHaveAttribute(
      'href',
      '/en?query=test&page=1'
    );
    expect(screen.getByRole('link', { name: '>' })).toHaveAttribute(
      'href',
      '/en?query=test&page=3'
    );
  });

  it('renders ellipsis for large page counts', () => {
    render(
      <TestProviders>
        <Pagination currentPage={5} totalPages={10} baseUrl="/" />
      </TestProviders>
    );

    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });
});
