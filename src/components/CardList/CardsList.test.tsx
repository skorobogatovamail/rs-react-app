import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TestProviders } from '../../test-utils/TestProviders';
import { CardsList } from './CardsList';

const mockItems = [
  {
    id: 1,
    title: 'Rick Sanchez',
    description: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    link: 'https://rickandmortyapi.com/api/character/1',
  },
];

describe('CardsList', () => {
  it('toggles selection when checkbox is clicked', () => {
    render(
      <TestProviders>
        <CardsList items={mockItems} />
      </TestProviders>
    );

    const checkbox = screen.getByRole('checkbox', {
      name: 'Select Rick Sanchez',
    });

    fireEvent.click(checkbox);
    // We can't easily check the store here because TestProviders creates its own store
    // But we can check if the checkbox is checked
    expect(checkbox).toBeChecked();
  });

  it('renders card with correct link', () => {
    render(
      <TestProviders>
        <CardsList items={mockItems} />
      </TestProviders>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/en?details=1');
  });
});
