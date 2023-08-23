"use client";

import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";

type ITableProps = {
  data: any[];
  columns: any[];
};

const Table = ({ data, columns }: ITableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="border-r border-l border-t max-w-full w-full overflow-x-auto">
      <table className="border-collapse w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={twMerge(
                      "border-r last:border-r-0 font-medium text-left p-2 px-3 h-full",
                      header.column.columnDef.meta?.isStickyCell &&
                        "sticky p-0 left-0 border-r-0 bg-white z-[1]",
                    )}
                    style={{
                      width: header.getSize() || "auto",
                      maxWidth: header.column.columnDef.maxSize || "auto",
                      minWidth: header.column.columnDef.minSize || "auto",
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={twMerge(
                          "flex justify-between items-center",
                          header.column.columnDef.meta?.isStickyCell &&
                            "border-r p-2 px-3 h-full w-full",
                          header.column.getCanSort() &&
                            "cursor-pointer select-none",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>

                        <span className="">
                          {{
                            asc: <IoChevronUpSharp />,
                            desc: <IoChevronDownSharp />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </span>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={twMerge(
                        "border-r last:border-r-0 p-2 px-3 h-full",
                        cell.column.columnDef.meta?.isStickyCell &&
                          "sticky p-0 left-0 border-r-0 bg-white z-[1]",
                      )}
                      style={{
                        width: cell.column.getSize() || "auto",
                        maxWidth: cell.column.columnDef.maxSize || "auto",
                        minWidth: cell.column.columnDef.minSize || "auto",
                      }}
                    >
                      <div
                        className={twMerge(
                          cell.column.columnDef.meta?.isStickyCell &&
                            "border-r p-2 px-3 h-full w-full",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
