"use client";

import Table from "@/components/ds/Table";
import { IStudio } from "@/interfaces/studio";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

const StudiosContainer = ({ studios }: { studios: any[] }) => {
  const columns: ColumnDef<IStudio>[] = [
    { header: "Id", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    {
      header: "Status",
      accessorKey: "is_active",
      cell(props) {
        return props.row.original.is_active ? "Active" : "Inactive";
      },
    },
    { header: "Category", accessorKey: "category.name" },
    {
      header: "Created at",
      accessorKey: "created_at",
      cell: ({ row }) => {
        return (
          <span>
            {formatDate(row.original.created_at, "MMM dd, yyyy 'at' HH:mm")}
          </span>
        );
      },
    },
  ];

  return <Table columns={columns} data={studios} />;
};

export default StudiosContainer;
