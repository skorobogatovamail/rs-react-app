import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { CardType } from '../../components/Card/Card';
import { toggleItem } from '../../store/selectedItemsSlice';
import { setupStore } from '../../store/store';
import { TestProviders } from '../../test-utils/TestProviders';
import { SelectedItemsFlyout } from './SelectedItemsFlyout';

const mockItem: CardType = {
  id: 1,
  title: 'Rick Sanchez',
  description: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  link: 'https://rickandmortyapi.com/api/character/1',
};

describe('SelectedItemsFlyout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ ok: true, blob: () => Promise.resolve(new Blob()) })
      )
    );
  });

  it('does not render when no items are selected', () => {
    const store = setupStore();
    const { container } = render(
      <TestProviders>
        <Provider store={store}>
          <SelectedItemsFlyout />
        </Provider>
      </TestProviders>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows selected count and action buttons', () => {
    const store = setupStore();
    store.dispatch(toggleItem(mockItem));
    render(
      <TestProviders>
        <Provider store={store}>
          <SelectedItemsFlyout />
        </Provider>
      </TestProviders>
    );

    // mock useTranslations returns the key with count
    expect(screen.getByText('itemsSelected')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'unselectAll' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'export' })).toBeInTheDocument();
  });

  it('clears all selections when Unselect all is clicked', () => {
    const store = setupStore();
    store.dispatch(toggleItem(mockItem));
    render(
      <TestProviders>
        <Provider store={store}>
          <SelectedItemsFlyout />
        </Provider>
      </TestProviders>
    );

    fireEvent.click(screen.getByRole('button', { name: 'unselectAll' }));
    expect(store.getState().selectedItems.selectedItems[1]).toBeUndefined();
  });

  it('calls fetch when Download is clicked', () => {
    const store = setupStore();
    store.dispatch(toggleItem(mockItem));
    render(
      <TestProviders>
        <Provider store={store}>
          <SelectedItemsFlyout />
        </Provider>
      </TestProviders>
    );

    fireEvent.click(screen.getByRole('button', { name: 'export' }));
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/csv',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ items: [mockItem] }),
      })
    );
  });
});
