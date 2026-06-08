import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export const selectSelectedItemsMap = (state: RootState) =>
  state.selectedItems.selectedItems;

export const selectSelectedItemsList = createSelector(
  [selectSelectedItemsMap],
  (selectedItems) => Object.values(selectedItems)
);

export const selectSelectedCount = createSelector(
  [selectSelectedItemsMap],
  (selectedItems) => Object.keys(selectedItems).length
);

export const selectIsItemSelected = (id: number) =>
  createSelector([selectSelectedItemsMap], (selectedItems) =>
    Boolean(selectedItems[id])
  );
