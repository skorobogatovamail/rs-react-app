import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Results } from './Results';

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
    render(<Results items={mockItems} isLoading={false} error={null} />);
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
  });

  it('displays "no results found" message when data array is empty', () => {
    render(<Results items={[]} isLoading={false} error={null} />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    render(<Results items={[]} isLoading={true} error={null} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<Results items={[]} isLoading={false} error="Failed to fetch" />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });
});
