import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hit } from '@/app/api/image/types';


interface SearchState {
  images: Hit[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  images: [],
  loading: false,
  error: null,
};


const searchImagesSlice = createSlice({
  name: 'searchImages',
  initialState,
  reducers: {
    searchStart(state) {
      state.loading = true;
      state.error = null;
    },
    searchSuccess(state, action: PayloadAction<Hit[]>) {
      state.loading = false;
      state.images = action.payload;
    },
    searchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearImages(state) {
      state.images = [];
    },
  },
});

export const { searchStart, searchSuccess, searchFailure, clearImages } = searchImagesSlice.actions;

export default searchImagesSlice.reducer;
