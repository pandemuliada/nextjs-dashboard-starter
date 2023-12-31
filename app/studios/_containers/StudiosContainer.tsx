"use client";

import StudioForm from "@/app/studios/_components/forms/StudioForm";
import Modal, { useModal } from "@/components/ds/Modal";
import Popover from "@/components/ds/Popover";
import Sheet from "@/components/ds/Sheet";
import Button from "@/components/ds/Button";
import Table from "@/components/ds/Table";
import { IStudio } from "@/interfaces/studio";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { useToast } from "@/components/ds/Toast";
import { useState } from "react";

const StudiosContainer = ({ studios }: { studios: any[] }) => {
  const sheetState = useModal();
  const modalState = useModal();
  const { toast } = useToast();

  const [count, setCount] = useState(0);
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
          <Button onPress={() => modalState.open()} className="mb-5">
            Open Modal
          </Button>

          <StudioForm
            onSubmit={(values) => {
              toast({
                message: JSON.stringify(values),
                variant: "success",
              });
            }}
          />
        </Sheet.Panel>
      </Sheet>

      <Modal state={modalState}>
        <Modal.Content title="Slebew" className="p-5">
          {[0, 1, 2].map((_, index) => (
            <p key={index}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          ))}

          <div className="grid grid-cols-2 gap-5 mt-5">
            <Button variant="outline" onPress={() => modalState.close()}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </Modal.Content>
      </Modal>

      <Button
        onPress={() => {
          toast({
            message: `Toast ${count + 1}`,
            variant: "danger",
          });
          setCount((prevCount) => prevCount + 1);
        }}
      >
        Toast
      </Button>
      <Popover placement="bottom">
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
