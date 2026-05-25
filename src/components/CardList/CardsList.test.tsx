import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider } from '../../context/ThemeContext';
import { setupStore } from '../../store/store';
import { CardsList } from './CardsList';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockItems = [
  {
    id: 1,
    title: 'Rick Sanchez',
    description: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    link: 'https://rickandmortyapi.com/api/character/1',
  },
];

const renderCardsList = (store = setupStore()) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route path="/" element={<CardsList items={mockItems} />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

describe('CardsList', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('toggles selection when checkbox is clicked without navigating', () => {
    const store = setupStore();
    renderCardsList(store);
    const checkbox = screen.getByRole('checkbox', {
      name: 'Select Rick Sanchez',
    });

    fireEvent.click(checkbox);
    expect(store.getState().selectedItems.selectedItems[1]).toEqual(
      mockItems[0]
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to details when card is clicked', () => {
    const store = setupStore();
    renderCardsList(store);
    const card = screen.getByText('Rick Sanchez').closest('[role="button"]');
    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/details/1',
      search: '?page=1',
    });
    expect(store.getState().selectedItems.selectedItems[1]).toBeUndefined();
  });
});
