'use client';

import { useEffect, useMemo, useState } from 'react';
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

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Pagination } from './pagination';

interface PaginationTypes {
  rowPerPage: number;
  pageIndex: number;
}

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  query: PaginationTypes;
  total?: number;
  hidePagination?: boolean;
  isShowNo?: boolean;
  isLoading?: boolean;
  onPositionChange?: (data: TData[]) => void;
}

export function DraggableTable<TData extends { id: string }, TValue>({
  columns,
  data,
  query,
  total,
  hidePagination = false,
  isShowNo = true,
  isLoading,
  onPositionChange,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState(data);
  const [activeRow, setActiveRow] = useState<TData | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => setTableData(data), [data]);

  const pageStartIndex = ((query.pageIndex ?? 1) - 1) * (query.rowPerPage ?? 20);

  const displayColumns = useMemo<ColumnDef<TData, TValue>[]>(() => {
    return [
      {
        accessorKey: 'drag',
        header: 'Sort',
        size: 50,
        cell: () => <Menu className="mx-auto text-gray-500" />,
      },
      ...columns,
    ];
  }, [columns]);

  const table = useReactTable({
    data: tableData,
    columns: displayColumns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveRow(null);
    if (!over || active.id === over.id) return;

    setTableData((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newData = arrayMove(items, oldIndex, newIndex);
      onPositionChange?.(newData);
      return newData;
    });
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="relative flex-grow overflow-auto rounded-md">
        {isLoading ? (
          <Spinner />
        ) : (
          <DndContext
            sensors={sensors}
            onDragStart={(e) => setActiveRow(tableData.find((i) => i.id === e.active.id) || null)}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((group) => (
                  <TableRow key={group.id}>
                    {group.headers.map((header) => (
                      <TableHead key={header.id} className="bg-secondary">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                <SortableContext
                  items={tableData.map((i) => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <SortableRow key={row.id} row={row} index={pageStartIndex + row.index + 1} />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>

            <DragOverlay>
              {activeRow ? (
                <div className="rounded px-4 py-2">
                  <Menu />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      {!hidePagination && total && (
        <Pagination total={total} currentPage={query.pageIndex} pageSize={query.rowPerPage} />
      )}
    </div>
  );
}

const SortableRow = ({ row, index }: { row: Row<any>; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.original.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn(' ', isDragging && 'shadow-lg text-primary')}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {cell.column.id === 'drag' ? (
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing flex items-center gap-2"
            >
              <Menu />
              <span className="text-xs">{index}</span>
            </button>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};
