import { describe, expect, it } from 'vitest';

import type { CardType } from '../components/Card/Card';
import {
  clearAll,
  removeItem,
  selectedItemsSlice,
  toggleItem,
} from './selectedItemsSlice';
import { selectSelectedCount, selectSelectedItemsList } from './selectors';
import { setupStore } from './store';

const mockItem: CardType = {
  id: 1,
  title: 'Rick Sanchez',
  description: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  link: 'https://rickandmortyapi.com/api/character/1',
};

const mockItem2: CardType = {
  id: 2,
  title: 'Morty Smith',
  description: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  link: 'https://rickandmortyapi.com/api/character/2',
};

describe('selectedItemsSlice', () => {
  it('adds item when toggled on', () => {
    const state = selectedItemsSlice.reducer(undefined, toggleItem(mockItem));
    expect(state.selectedItems[1]).toEqual(mockItem);
  });

  it('removes item when toggled off', () => {
    const withItem = selectedItemsSlice.reducer(
      undefined,
      toggleItem(mockItem)
    );
    const state = selectedItemsSlice.reducer(withItem, toggleItem(mockItem));
    expect(state.selectedItems[1]).toBeUndefined();
  });

  it('clears all selected items', () => {
    const store = setupStore();
    store.dispatch(toggleItem(mockItem));
    store.dispatch(toggleItem(mockItem2));
    store.dispatch(clearAll());
    expect(selectSelectedCount(store.getState())).toBe(0);
  });

  it('returns selected items as array via selectors', () => {
    const store = setupStore();
    store.dispatch(toggleItem(mockItem));
    store.dispatch(toggleItem(mockItem2));
    expect(selectSelectedItemsList(store.getState())).toEqual([
      mockItem,
      mockItem2,
    ]);
  });

  it('removes item by id', () => {
    const store = setupStore();
    store.dispatch(toggleItem(mockItem));
    store.dispatch(removeItem(mockItem.id));
    expect(store.getState().selectedItems.selectedItems[1]).toBeUndefined();
  });
});
