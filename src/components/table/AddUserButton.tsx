import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserForm, UserFormSchema } from './UserForm';
import { useCreateUserMutation } from '../../services/api/users';
import { User } from '../../types';

const AddUserButton: FC = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [modelOpen, setModalOpen] = useState<boolean>(false);

  const onSubmit = (values: UserFormSchema) => {
    delete values.id;
    createUser(values as Partial<User>).then(() => setModalOpen(false));
  };

  return (
    <Dialog open={modelOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button disabled={isLoading}>
          <PlusIcon className="mr-2 h-4 w-4" /> New Record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Record</DialogTitle>
          <DialogDescription>
            Add a new user here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <UserForm onSubmit={onSubmit} disabled={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserButton;
