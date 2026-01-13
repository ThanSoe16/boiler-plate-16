'use client';
import { DraggableTable } from '@/components/shared/data-tables/draggable-table';
import { ColumnDef } from '@tanstack/react-table';

const invoices = [
  {
    id: '1',
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    id: '2',
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    id: '3',
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '4',
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    id: '5',
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    id: '6',
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '7',
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

export const invoiceColumns: ColumnDef<any>[] = [
  { accessorKey: 'invoice', header: 'Invoice' },
  { accessorKey: 'paymentStatus', header: 'Payment Status' },
  { accessorKey: 'totalAmount', header: 'Total Amount' },
  { accessorKey: 'paymentMethod', header: 'Payment Method' },
];

export function DraggableTableSimple() {
  return (
    <div className="w-full px-6">
      <DraggableTable
        columns={invoiceColumns}
        data={invoices}
        query={{ rowPerPage: 10, pageIndex: 1 }}
        onPositionChange={(rows) => {
          console.log(rows.map((r, i) => ({ id: r.id, order: i + 1 })));
        }}
      />
    </div>
  );
}
