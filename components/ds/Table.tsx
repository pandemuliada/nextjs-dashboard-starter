"use client";

import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  IoChevronBackSharp,
  IoChevronDownSharp,
  IoChevronForwardSharp,
  IoChevronUpSharp,
} from "react-icons/io5";
import {
  TbArrowNarrowDown,
  TbArrowNarrowUp,
  TbArrowsSort,
} from "react-icons/tb";

type ITableProps = {
  data: any[];
  columns: any[];
  pagination?: {
    pageSize?: number;
  };
  className?: string;
  stickyHeader?: boolean;
  selectable?: boolean;
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

  const [isScrolledToRight, setIsScrolledToRight] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setIsScrolledToRight(container.scrollLeft > 0);
    }

    if (container) {
      setIsScrolledToBottom(container.scrollTop > 0);
    }
  };

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
    // debugTable: true,
  });

  return (
    <div>
      <div
        className={twMerge(
          "border-r border-b border-l border-t max-w-full h-full w-full overflow-x-auto",
          className,
        )}
        onScroll={handleScroll}
        ref={containerRef}
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
                        "font-medium border-b text-left h-full py-2 px-2",
                        isScrolledToRight &&
                          isStickyToLeft &&
                          "bg-white table__cell--sticky-left z-[2]",

                        isScrolledToBottom &&
                          stickyHeader &&
                          "table__cell--sticky-top z-[2] bg-white",
                        isStickyToLeft && stickyHeader && "z-[3]",
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
                            "flex justify-between items-center w-fit py-1 px-2",
                            header.column.getCanSort() &&
                              "cursor-pointer hover:bg-gray-100",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </span>

                          {header.column.getCanSort() && (
                            <span className={twMerge("ml-2")}>
                              {{
                                asc: <TbArrowNarrowUp />,
                                desc: <TbArrowNarrowDown />,
                              }[header.column.getIsSorted() as string] ?? (
                                <TbArrowsSort />
                              )}
                            </span>
                          )}
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
                          "relative border-r-0 text-left py-3 px-4 h-full",
                          [true, "left"].includes(
                            cell.column.columnDef.meta?.fixed as
                              | boolean
                              | string,
                          ) &&
                            isScrolledToRight &&
                            "bg-white table__cell--sticky-left z-[1]",
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
