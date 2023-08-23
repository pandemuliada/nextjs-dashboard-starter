"use client";

import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  IoChevronBackSharp,
  IoChevronDownSharp,
  IoChevronForwardSharp,
  IoChevronUpSharp,
} from "react-icons/io5";

type ITableProps = {
  data: any[];
  columns: any[];
  pagination?: {
    pageSize?: number;
  };
};

const Table = ({
  data,
  columns,
  pagination: paginationFromProps,
}: ITableProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: paginationFromProps?.pageSize || 10,
    pageIndex: 0,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pagination?.pageSize),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <div>
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

      <div className="flex justify-between mt-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          {/* <button
            className="border aspect-square w-7 h-7 flex items-center justify-center"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button> */}
          <button
            className="border aspect-square w-7 h-7 flex items-center justify-center disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IoChevronBackSharp />
          </button>
          <button
            className="border aspect-square w-7 h-7 flex items-center justify-center disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <IoChevronForwardSharp />
          </button>
          {/* <button
            className="border aspect-square w-7 h-7 flex items-center justify-center"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Table;
