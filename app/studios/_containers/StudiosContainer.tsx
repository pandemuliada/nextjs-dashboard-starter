"use client";

import Table from "@/components/ds/Table";
import { IStudio } from "@/interfaces/studio";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

const StudiosContainer = ({ studios }: { studios: any[] }) => {
  const columns: ColumnDef<IStudio>[] = [
    {
      header: "Name",
      accessorKey: "name",
      meta: {
        fixed: "left",
      },
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
        stickyHeader={true}
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
