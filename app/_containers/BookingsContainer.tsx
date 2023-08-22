"use client";

import Table from "@/components/ds/Table";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

interface IBooking {
  id: string;
  created_at: string;
}

const BookingsContainer = ({ bookings }: { bookings: any[] }) => {
  const columns: ColumnDef<IBooking>[] = [
    { header: "Id", accessorKey: "id" },
    {
      header: "Created at",
      accessorKey: "created_at",
      cell: ({ row }) => {
        return <div>{formatDate(row.original.created_at)}</div>;
      },
    },
  ];

  return <Table columns={columns} data={bookings} />;
};

export default BookingsContainer;
