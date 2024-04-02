import { User } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserTableState {
  queryParams: {
    perPage: number;
    page: number;
  };
  updateUser?: User;
  deleteUser?: User;
}

const initialState: UserTableState = {
  queryParams: {
    perPage: 5,
    page: 1,
  },
};

export const userTableSlice = createSlice({
  name: 'userTable',
  initialState,
  reducers: {
    setPerPage: (state, action: PayloadAction<number>) => {
      state.queryParams.perPage = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.queryParams.page = action.payload;
    },
    setUpdateUser: (state, action: PayloadAction<User | undefined>) => {
      state.updateUser = action.payload;
    },
    setDeleteUser: (state, action: PayloadAction<User | undefined>) => {
      state.deleteUser = action.payload;
    },
  },
});

export const { setPerPage, setPage, setUpdateUser, setDeleteUser } =
  userTableSlice.actions;

export default userTableSlice.reducer;
