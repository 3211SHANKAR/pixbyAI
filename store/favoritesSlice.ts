import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ImageItem = {
  category: string;
  title: string;
  tags: string[];
  src: string;
  largeImageURL: string;
  views: number;
  downloads: number;
  user: string;
  userImageURL: string;
  pageURL: string;
};

interface FavoriteImagesState {
  images: ImageItem[];
}

const initialState: FavoriteImagesState = {
  images: [],
};

const favoriteImagesSlice = createSlice({
  name: 'favoriteImages',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<ImageItem>) => {
      state.images.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.images = state.images.filter((_, index) => index !== action.payload);
    },
  },
});

// Export the actions to use in components
export const { addToFavorites, removeFromFavorites } = favoriteImagesSlice.actions;

// Export the reducer to add to the store
export default favoriteImagesSlice.reducer;
