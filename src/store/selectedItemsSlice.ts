import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CardType } from '../components/Card/Card';

export type SelectedItemsSliceState = {
  selectedItems: Record<number, CardType>;
};

const initialState: SelectedItemsSliceState = {
  selectedItems: {},
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<CardType>) => {
      const { id } = action.payload;
      if (state.selectedItems[id]) {
        delete state.selectedItems[id];
      } else {
        state.selectedItems[id] = action.payload;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      delete state.selectedItems[action.payload];
    },
    clearAll: (state) => {
      state.selectedItems = {};
    },
  },
});

export const { toggleItem, removeItem, clearAll } = selectedItemsSlice.actions;
