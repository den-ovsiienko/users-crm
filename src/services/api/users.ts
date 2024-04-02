import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { User } from '../../types';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://reqres.in/api/users',
  paramsSerializer: (params) =>
    new URLSearchParams(
      decamelizeKeys(params) as Record<string, any>
    ).toString(),
});

// Wrapping the base query to apply conversion for all endpoints
const baseQueryWithReformatting: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (args.body) {
    args.body = decamelizeKeys({ ...args.body });
  }
  const result = await baseQuery(args, api, extraOptions);
  if (result.data) {
    result.data = camelizeKeys(result.data);
  }
  return result;
};

export type ListUsersParams = {
  page: number;
  perPage?: number;
};

export type ListUsersResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: User[];
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReformatting,
  endpoints: (builder) => ({
    listUsers: builder.query<ListUsersResponse, ListUsersParams>({
      query: (queryParams) => ({
        url: '/',
        params: queryParams,
      }),
    }),
    getUser: builder.query<User, number>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (post) => ({
        url: '/',
        method: 'POST',
        body: post,
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        // Fake User Creation
        // TODO: Should refetch all users
        try {
          const { data: createdUser } = await queryFulfilled;
          dispatch((dispatch, getState) => {
            const params = (getState() as RootState).userTable.queryParams;
            dispatch(
              usersApi.util.updateQueryData('listUsers', params, (users) => {
                users.data.splice(0, 0, { ...createdUser, status: 'Created' });
                users.total += 1;
              })
            );
          });
        } catch {}
      },
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        // Fake User Update
        // TODO: Should refetch all users
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch((dispatch, getState) => {
            const params = (getState() as RootState).userTable.queryParams;
            dispatch(
              usersApi.util.updateQueryData('listUsers', params, (users) => {
                const updateUserId = users.data.findIndex(
                  (user) => user.id === id
                );
                users.data[updateUserId] = {
                  ...updatedUser,
                  status: 'Updated',
                };
              })
            );
          });
        } catch {}
      },
    }),
    deleteUser: builder.mutation<User, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Fake User Deletion
        // TODO: Should refetch all users
        try {
          await queryFulfilled;
          dispatch((dispatch, getState) => {
            const params = (getState() as RootState).userTable.queryParams;
            dispatch(
              usersApi.util.updateQueryData('listUsers', params, (users) => {
                users.data = users.data.filter((user) => user.id !== id);
                users.total -= 1;
              })
            );
          });
        } catch {}
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useListUsersQuery,
} = usersApi;
