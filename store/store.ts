import { configureStore } from '@reduxjs/toolkit';
import favoriteImagesReducer from './favoritesSlice'
import searchImagesReducer from './searchImagesSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

// Create the store and combine any reducers you have
export const store = configureStore({
  reducer: {
    favoriteImages: favoriteImagesReducer,
    searchImages: searchImagesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create custom hooks for dispatch and selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
