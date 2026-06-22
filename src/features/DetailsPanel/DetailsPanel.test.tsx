import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TestProviders } from '../../test-utils/TestProviders';
import { DetailsPanel } from './DetailsPanel';

const mockItem = {
  id: 1,
  title: 'Rick Sanchez',
  description: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  link: 'https://rickandmortyapi.com/api/character/1',
};

describe('DetailsPanel', () => {
  it('shows character details when item is provided', () => {
    render(
      <TestProviders>
        <DetailsPanel item={mockItem} />
      </TestProviders>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  it('shows loader when isLoading is true', () => {
    render(
      <TestProviders>
        <DetailsPanel isLoading={true} />
      </TestProviders>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(
      <TestProviders>
        <DetailsPanel error="Failed to fetch" />
      </TestProviders>
    );

    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('shows "no results found" when no item is provided and not loading', () => {
    render(
      <TestProviders>
        <DetailsPanel />
      </TestProviders>
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
