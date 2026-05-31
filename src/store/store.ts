import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rickAndMortyApi } from '../services/rickAndMorty';
import { selectedItemsSlice } from './selectedItemsSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      selectedItems: selectedItemsSlice.reducer,
      [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rickAndMortyApi.middleware),
    preloadedState: preloadedState as RootState | undefined,
  });

export type AppStore = ReturnType<typeof setupStore>;
