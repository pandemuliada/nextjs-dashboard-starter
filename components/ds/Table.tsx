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
  className?: string;
  stickyHeader?: boolean;
};

const Table = ({
  data,
  columns,
  pagination: paginationFromProps,
  className,
  stickyHeader = false,
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
      <div
        className={twMerge(
          "border-r border-b border-l border-t max-w-full h-full w-full overflow-x-auto",
          className,
        )}
      >
        <table className="border-collapse w-full">
          <thead className={twMerge("border-b", stickyHeader && "border-b-0")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isStickyToLeft = [true, "left"].includes(
                    header.column.columnDef.meta?.fixed as boolean | string,
                  );

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={twMerge(
                        "font-medium border-r text-left py-3 px-4 h-full",
                        header.column.getCanSort() &&
                          "cursor-pointer select-none",
                        isStickyToLeft &&
                          "bg-white table__cell--sticky-left z-[2]",
                        stickyHeader &&
                          "table__cell--sticky-top z-[2] bg-white",
                        isStickyToLeft && stickyHeader && "z-[3]",
                      )}
                      style={{
                        width: header.getSize() || "auto",
                        maxWidth: header.column.columnDef.maxSize || "auto",
                        minWidth: header.column.columnDef.minSize || "auto",
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={twMerge(
                            "flex justify-between items-center",
                          )}
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
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={twMerge(
                          "relative font-medium border-r text-left py-3 px-4 h-full",
                          [true, "left"].includes(
                            cell.column.columnDef.meta?.fixed as
                              | boolean
                              | string,
                          ) && "bg-white table__cell--sticky-left z-[1]",
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
