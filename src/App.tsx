import { FC } from 'react';
import { useListUsersQuery } from './services/api/users';
import { User } from './types';
import { DataTable } from './components/table/DataTable';

import UpdateUserDialog from './components/table/UpdateUserDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './services/store';
import { setUpdateUser } from './services/slices/tableSlice';
import columns from './columns';
import UserTableHeader from './components/table/UserTableHeader';
import UserTableFooter from './components/table/UserTableFooter';
import DeleteUserDialog from './components/table/DeleteUserDialog';

const App: FC = () => {
  const params = useSelector((state: RootState) => state.userTable.queryParams);
  const { data, refetch, isFetching } = useListUsersQuery(params);

  const dispatch = useDispatch();

  if (!data) {
    return <></>;
  }
  return (
    <div className="container mx-auto py-10">
      <UserTableHeader refetch={refetch} isFetching={isFetching} />
      <DataTable
        onRowClick={(data) => dispatch(setUpdateUser(data as User))}
        columns={columns}
        data={data.data}
      />
      <UserTableFooter />

      <UpdateUserDialog />
      <DeleteUserDialog />
    </div>
  );
};

export default App;
