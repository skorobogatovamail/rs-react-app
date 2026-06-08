import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { TestProviders } from '../../test-utils/TestProviders';
import { Results } from './Results';

const renderResults = (props: React.ComponentProps<typeof Results>) =>
  render(
    <TestProviders>
      <MemoryRouter>
        <Results {...props} />
      </MemoryRouter>
    </TestProviders>
  );

const mockItems = [
  {
    id: 1,
    title: 'Rick Sanchez',
    description: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    link: 'https://rickandmortyapi.com/api/character/1',
  },
  {
    id: 2,
    title: 'Morty Smith',
    description: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    link: 'https://rickandmortyapi.com/api/character/2',
  },
];

describe('Results Component', () => {
  it('renders correct number of items when data is provided', () => {
    renderResults({ items: mockItems, isLoading: false, error: null });
    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
  });

  it('displays "no results found" message when data array is empty', () => {
    renderResults({ items: [], isLoading: false, error: null });
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    renderResults({ items: [], isLoading: true, error: null });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    renderResults({ items: [], isLoading: false, error: 'Failed to fetch' });
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });
});
