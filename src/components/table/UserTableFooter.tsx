import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/services/store';
import { setPage, setPerPage } from '@/services/slices/tableSlice';
import { useListUsersQuery } from '@/services/api/users';
import { Button } from '@/components/ui/button';
import {
  CaretLeftIcon,
  CaretRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

const UserTableFooter: FC = ({}) => {
  const params = useSelector((state: RootState) => state.userTable.queryParams);
  const dispatch = useDispatch();

  const { data } = useListUsersQuery(params);

  const onRowsPerPageValueChange = (value: string) => {
    dispatch(setPerPage(Number.parseInt(value)));
  };

  const onFirstPage = () => dispatch(setPage(1));
  const onPreviousPage = () => dispatch(setPage(params.page - 1));
  const onNextPage = () => dispatch(setPage(params.page + 1));
  const onLastPage = () => dispatch(setPage(data?.totalPages ?? 0));

  return (
    <div className="flex justify-between items-center py-2 gap-8">
      {/* Rows shown indicator */}
      <div className="flex-1 text-sm text-muted-foreground hidden sm:block">
        {data?.data.length} of {data?.total} row(s){' '}
        <span className="hidden md:inline">are shown</span>
      </div>

      {/* Rows per page selector */}
      <div className="flex items-center gap-2">
        <p className="text-sm whitespace-nowrap">
          Rows <span className="hidden md:inline">per page</span>
        </p>
        <Select
          value={params.perPage.toString()}
          onValueChange={onRowsPerPageValueChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Current page indicator */}
      <p className="text-sm whitespace-nowrap">
        Page {data?.page} of {data?.totalPages}
      </p>

      {/* Page Controllers */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled={params.page <= 1}
          onClick={onFirstPage}
          className="hidden md:inline-flex"
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={params.page <= 1}
          onClick={onPreviousPage}
        >
          <CaretLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={!data || params.page >= data.totalPages}
          onClick={onNextPage}
        >
          <CaretRightIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={!data || params.page >= data.totalPages}
          onClick={onLastPage}
          className="hidden md:inline-flex"
        >
          <DoubleArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default UserTableFooter;
