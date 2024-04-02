import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  CopyIcon,
  DotsVerticalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { store } from './services/store';
import { setDeleteUser, setUpdateUser } from './services/slices/tableSlice';

const onCopyEmail = (e: any, user: User) => {
  e?.stopPropagation();
  navigator.clipboard.writeText(user.email);
};

const onUpdateUser = (e: any, user: User) => {
  e?.stopPropagation();
  store.dispatch(setUpdateUser(user));
};

const onDeleteUser = (e: any, user: User) => {
  e?.stopPropagation();
  store.dispatch(setDeleteUser(user));
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      const imgSrc: string | undefined = row.getValue('avatar');
      const user = row.original;
      const initials: string = user.firstName?.[0] + user.lastName?.[0];
      return (
        <Avatar>
          <AvatarImage src={imgSrc} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'status',
    cell: ({ row }) => {
      const user = row.original;
      if (!!user.status) {
        return <Badge variant="outline">{user.status}</Badge>;
      }
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={(e) => onCopyEmail(e, user)}>
              <CopyIcon className="h-4 w-4 mr-2" /> Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => onUpdateUser(e, user)}>
              <Pencil2Icon className="h-4 w-4 mr-2" /> Edit User
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => onDeleteUser(e, user)}>
              <TrashIcon className="h-4 w-4 mr-2" /> Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
