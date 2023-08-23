"use client";

import Table from "@/components/ds/Table";
import { IStudio } from "@/interfaces/studio";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

const StudiosContainer = ({ studios }: { studios: any[] }) => {
  const columns: ColumnDef<IStudio>[] = [
    {
      header: "ID",
      accessorKey: "id",
      minSize: 40,
      maxSize: 40,
      cell(props) {
        return <div>{props.getValue() as string}</div>;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Status",
      accessorKey: "is_active",
      cell(props) {
        return props.row.original.is_active ? "Active" : "Inactive";
      },
    },
    {
      header: "Category",
      accessorKey: "category.name",
      cell: ({ row }) => {
        return <span className="">{row.original.category?.name}</span>;
      },
    },
    {
      header: "Created at",
      accessorKey: "created_at",
      cell: ({ row }) => {
        return (
          <span className="whitespace-nowrap">
            {formatDate(row.original.created_at, "MMM dd, yyyy 'at' HH:mm")}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={studios}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default StudiosContainer;
