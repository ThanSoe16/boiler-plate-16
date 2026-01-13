'use client';

import { useMemo, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import { Pagination } from './pagination';

interface PaginationTypes {
  word?: string;
  rowPerPage: number;
  pageIndex: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  query?: PaginationTypes;
  total?: number;
  hidePagination?: boolean;
  className?: string;
  isShowNo?: boolean;
  renderHeader?: () => React.ReactNode;
  tablewrapperclasses?: string;
  isLoading?: boolean;
  getRowHighlight?: (row: TData) => boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  query,
  total,
  hidePagination = false,
  className,
  isShowNo = true,
  renderHeader,
  tablewrapperclasses,
  isLoading = false,
  getRowHighlight,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const pageStartIndex = useMemo(() => {
    return ((query?.pageIndex ?? 1) - 1) * (query?.rowPerPage ?? 20);
  }, [query]);

  const displayColumns = useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!isShowNo) return columns;

    return [
      {
        accessorKey: '__no__',
        header: () => <span className="pl-2">No.</span>,
        cell: ({ row }: { row: Row<TData> }) => (
          <span className="pl-4">{pageStartIndex + row.index + 1}</span>
        ),
        size: 60,
      },
      ...columns,
    ];
  }, [columns, isShowNo, pageStartIndex]);

  const table = useReactTable({
    data,
    columns: displayColumns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    defaultColumn: {
      size: 100,
      minSize: 40,
      maxSize: 500,
    },
  });

  return (
    <div className={cn('flex flex-col h-full w-full space-y-3', tablewrapperclasses)}>
      {renderHeader?.()}

      <div className={cn('relative h-full w-full flex-grow rounded-md overflow-auto', className)}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-primary bg-secondary px-3 py-4 whitespace-normal"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="text-sm">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => {
                  const highlight = getRowHighlight?.(row.original);

                  return (
                    <TableRow
                      key={row.id}
                      className={cn(
                        'border-b transition-colors',
                        highlight ? 'bg-gray-200' : 'bg-white hover:bg-gray-50',
                      )}
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell
                          key={cell.id}
                          style={{ minWidth: cell.column.getSize() }}
                          className={cn('pl-3', highlight && index !== 0 && 'opacity-40')}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={displayColumns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {!hidePagination && query && total ? (
        <Pagination total={total} currentPage={query.pageIndex} pageSize={query.rowPerPage} />
      ) : null}
    </div>
  );
}
