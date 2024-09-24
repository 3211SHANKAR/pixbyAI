"use client"
import React from 'react';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store/store'; // Adjust the path according to your file structure
import { RootState, AppDispatch } from '@/store/store'; // Import types if needed

interface StoreProviderProps {
  children: React.ReactNode;
}

// Create a custom hook to use the store's dispatch
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

// Create a custom hook to use the store's selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
