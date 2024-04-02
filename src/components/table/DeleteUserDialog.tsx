import { FC } from 'react';
import { useDeleteUserMutation } from '../../services/api/users';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { setDeleteUser } from '../../services/slices/tableSlice';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const DeleteUserDialog: FC = ({}) => {
  const [deleteUserFunc, { isLoading }] = useDeleteUserMutation();
  const deleteUser = useSelector(
    (state: RootState) => state.userTable.deleteUser
  );
  const dispatch = useDispatch();

  const onDelete = () => {
    if (deleteUser) {
      deleteUserFunc(deleteUser.id).then(() =>
        dispatch(setDeleteUser(undefined))
      );
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(setDeleteUser(undefined));
    }
  };

  return (
    <AlertDialog open={!!deleteUser} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{' '}
            <span className="font-semibold">
              {deleteUser?.firstName} {deleteUser?.lastName}
            </span>{' '}
            user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            Yes, Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
