import { configureStore } from '@reduxjs/toolkit';

import { selectedItemsSlice } from './selectedItemsSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      selectedItems: selectedItemsSlice.reducer,
    },
    preloadedState: preloadedState as RootState | undefined,
  });

export type AppStore = ReturnType<typeof setupStore>;
