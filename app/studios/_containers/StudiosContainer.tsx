"use client";

import Sheet from "@/components/Sheet";
import Button from "@/components/ds/Button";
import Table from "@/components/ds/Table";
import { useSheet } from "@/hooks";
import { IStudio } from "@/interfaces/studio";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

const StudiosContainer = ({ studios }: { studios: any[] }) => {
  const firstSheet = useSheet();
  const secondSheet = useSheet();

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl">Studios</h1>
        <Button {...firstSheet.triggerProps}>Add Studio</Button>
      </div>

      <Sheet state={firstSheet.state}>
        <Sheet.Panel
          title="Update Studio"
          side="left"
          className="w-full md:w-[300px] p-5 overflow-y-auto"
        >
          <Button {...secondSheet.triggerProps} className="mb-5">
            Open Other Panel
          </Button>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Sheet.Panel>
      </Sheet>

      <Sheet state={secondSheet.state} isKeyboardDismissDisabled>
        <Sheet.Panel className="p-5 overflow-y-auto">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Sheet.Panel>
      </Sheet>

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
