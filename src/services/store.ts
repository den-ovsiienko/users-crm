import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './api/users';
import userTableReducer from './slices/tableSlice';

export const store = configureStore({
  reducer: {
    userTable: userTableReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
