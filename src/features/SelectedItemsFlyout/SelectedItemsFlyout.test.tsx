import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { CardType } from '../../components/Card/Card';
import { toggleItem } from '../../store/slices/selectedItemsSlice';
import { setupStore } from '../../store/store';
import { SelectedItemsFlyout } from './SelectedItemsFlyout';

const mockItem: CardType = {
  id: 1,
  title: 'Rick Sanchez',
  description: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  link: 'https://rickandmortyapi.com/api/character/1',
};

vi.mock('../../utils/downloadCsv', () => ({
  downloadSelectedItemsAsCsv: vi.fn(),
}));

import { downloadSelectedItemsAsCsv } from '../../utils/downloadCsv';

describe('SelectedItemsFlyout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when no items are selected', () => {
    const store = setupStore();
    const { container } = render(
      <Provider store={store}>
        <SelectedItemsFlyout />
      </Provider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows selected count and action buttons', () => {
    const store = setupStore();
    store.dispatch(toggleItem(mockItem));
    render(
      <Provider store={store}>
        <SelectedItemsFlyout />
      </Provider>
    );

    expect(screen.getByText('1 item selected')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Unselect all' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Download' })
    ).toBeInTheDocument();
  });

  it('clears all selections when Unselect all is clicked', () => {
    const store = setupStore();
    store.dispatch(toggleItem(mockItem));
    render(
      <Provider store={store}>
        <SelectedItemsFlyout />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Unselect all' }));
    expect(store.getState().selectedItems.selectedItems[1]).toBeUndefined();
  });

  it('downloads csv when Download is clicked', () => {
    const store = setupStore();
    store.dispatch(toggleItem(mockItem));
    render(
      <Provider store={store}>
        <SelectedItemsFlyout />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Download' }));
    expect(downloadSelectedItemsAsCsv).toHaveBeenCalledWith([mockItem]);
  });
});
