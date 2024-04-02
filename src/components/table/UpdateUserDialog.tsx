import { FC } from 'react';
import { useUpdateUserMutation } from '../../services/api/users';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserForm, UserFormSchema } from './UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { setUpdateUser } from '../../services/slices/tableSlice';

const UpdateUserDialog: FC = ({}) => {
  const [updateUserFunc, { isLoading }] = useUpdateUserMutation();
  const updateUser = useSelector(
    (state: RootState) => state.userTable.updateUser
  );
  const dispatch = useDispatch();

  const onSubmit = (values: UserFormSchema) => {
    if (updateUser) {
      updateUserFunc({ ...values, id: updateUser.id }).then(() =>
        dispatch(setUpdateUser(undefined))
      );
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(setUpdateUser(undefined));
    }
  };

  return (
    <Dialog open={!!updateUser} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Record</DialogTitle>
          <DialogDescription>
            Update the user here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <UserForm
          onSubmit={onSubmit}
          defaultValues={updateUser}
          disabled={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
