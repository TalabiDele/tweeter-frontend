import { configureStore } from '@reduxjs/toolkit';
import {userSlice} from './auth/AuthSlice'; // Import the user slice
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userSlice.reducer, // Add other reducers here if needed
  },  
});

export const useAppDispatch: () => typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;

export default store;