"use client";

import StudioForm from "@/app/studios/_components/forms/StudioForm";
import Dialog from "@/components/Dialog";
import Popover from "@/components/Popover";
import Sheet from "@/components/Sheet";
import Button from "@/components/ds/Button";
import Table from "@/components/ds/Table";
import { IStudio } from "@/interfaces/studio";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { useOverlayTriggerState } from "react-stately";

const StudiosContainer = ({ studios }: { studios: any[] }) => {
  const sheetState = useOverlayTriggerState({});
  const dialogState = useOverlayTriggerState({});

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
        <Button
          onPress={() => {
            sheetState.open();
          }}
        >
          Add Studio
        </Button>
      </div>

      <Sheet state={sheetState}>
        <Sheet.Panel
          title="Update Studio"
          side="right"
          className="p-5 overflow-y-auto"
        >
          {/* <Button onPress={() => dialogState.open()} className="mb-5">
            Open Dialog
          </Button> */}
          {/* <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p> */}
          <StudioForm
            onSubmit={(values) => {
              console.log(values);
            }}
          />
        </Sheet.Panel>
      </Sheet>

      <Dialog state={dialogState}>
        <Dialog.Content centered title="Slebew" className="p-5">
          {[0, 1, 2].map((_, index) => (
            <p key={index}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          ))}

          <div className="grid grid-cols-2 gap-5 mt-5">
            <Button variant="outline" onPress={() => dialogState.close()}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </Dialog.Content>
      </Dialog>

      <Popover>
        <Popover.Trigger>
          <Button variant="outline">Trigger</Button>
        </Popover.Trigger>
        <Popover.Content className="p-2 shadow">
          <p>Something to say</p>
          <p>Something to say</p>
          <p>Something to say asdasdas asdasdas </p>
        </Popover.Content>
      </Popover>

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
