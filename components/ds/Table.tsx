"use client";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { twMerge } from "tailwind-merge";

type ITableProps = {
  data: any[];
  columns: any[];
};

const Table = ({ data, columns }: ITableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return (
    <div className="border-l border-r max-w-full w-full overflow-x-auto">
      <table className="border-collapse w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={twMerge(
                      "border font-medium text-left p-2 px-3",
                      header.column.columnDef.meta?.thClassName,
                    )}
                    style={{
                      width: header.getSize() || "auto",
                      maxWidth: header.column.columnDef.maxSize || "auto",
                      minWidth: header.column.columnDef.minSize || "auto",
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={twMerge(
                        "border p-2 px-3",
                        cell.column.columnDef.meta?.tdClassName,
                      )}
                      style={{
                        width: cell.column.getSize() || "auto",
                        maxWidth: cell.column.columnDef.maxSize || "auto",
                        minWidth: cell.column.columnDef.minSize || "auto",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
