import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';

const store = configureStore({
  reducer: {
    profiles: profileReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store; 