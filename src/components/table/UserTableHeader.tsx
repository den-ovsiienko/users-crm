import AddUserButton from './AddUserButton';
import { Button } from '@/components/ui/button';
import { UpdateIcon } from '@radix-ui/react-icons';
import { FC } from 'react';

type TableHeaderProps = {
  isFetching: boolean;
  refetch: () => void;
};

const UserTableHeader: FC<TableHeaderProps> = ({ isFetching, refetch }) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Users CRM</h2>
        <p className="text-muted-foreground">Developed by Denys Ovsiienko.</p>
      </div>
      <div className="mb-2 flex justify-between">
        <AddUserButton />
        <Button variant="secondary" disabled={isFetching} onClick={refetch}>
          <UpdateIcon className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>
    </>
  );
};

export default UserTableHeader;
