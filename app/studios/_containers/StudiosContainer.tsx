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
        return <div className="">{props.getValue() as string}</div>;
      },
      meta: {
        thClassName: "sticky left-0 bg-white z-[1] text-left px-4",
        tdClassName: "sticky left-0 bg-white z-[1] text-left px-4",
      },
    },
    {
      header: "Name",
      accessorKey: "name",
      cell(props) {
        return <div className="!sticky left-20">{props.row.original.name}</div>;
      },
    },
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
          <span className="whitespace-nowrap">
            {formatDate(row.original.created_at, "MMM dd, yyyy 'at' HH:mm")}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} data={studios} />
    </div>
  );
};

export default StudiosContainer;
