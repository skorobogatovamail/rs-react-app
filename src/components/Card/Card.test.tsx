import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

const mockItem = {
  id: 1,
  title: 'Rick Sanchez',
  description: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  link: 'https://rickandmortyapi.com/api/character/1',
};

describe('Card Component', () => {
  it('displays item name and description correctly', () => {
    render(<Card {...mockItem} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    const img = screen.getByAltText('Rick Sanchez');
    expect(img).toHaveAttribute('src', mockItem.image);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockItem.link);
  });
});
