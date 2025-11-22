'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../common/Table';
import {
  ColumnDef,
  ColumnSizingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { PostResponse } from '@/types/post';
import { useEffect, useState } from 'react';
import { ColumnToggle } from './ColumnToggle';
import { ColumnResizer } from './ColumnResizer';
import { useInView } from 'react-intersection-observer';
import { PostFilter } from './PostFilter';

interface PostTableProps<TValue> {
  columns: ColumnDef<PostResponse, TValue>[];
  data: PostResponse[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}

export const PostTable = <TValue,>({
  columns,
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PostTableProps<TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const router = useRouter();

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onColumnSizingChange: setColumnSizing,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
      columnSizing,
      sorting,
    },
  });

  return (
    <div>
      <PostFilter className="m-4 flex justify-between">
        <ColumnToggle table={table} />
      </PostFilter>

      <div className="m-2 [&>div]:max-h-dvh">
        <Table className="table-fixed" style={{ width: table.getCenterTotalSize() }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="sticky top-0">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-primary-foreground relative"
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      <ColumnResizer header={header} />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => {
                  const post = row.original as PostResponse;
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push(`/posts/${post.id}`)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="truncate">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                {/* 무한 스크롤 트리거 */}
                <TableRow ref={ref}>
                  <TableCell colSpan={columns.length} className="h-20 text-center">
                    {isFetchingNextPage ? (
                      <div className="flex items-center justify-center">
                        <span>로딩 중...</span>
                      </div>
                    ) : hasNextPage ? (
                      <div className="flex items-center justify-center">
                        <span>더 보기</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>모든 데이터를 불러왔습니다.</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-auto text-center">
                  게시글이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
