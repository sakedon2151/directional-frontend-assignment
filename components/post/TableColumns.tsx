'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PostResponse } from '@/types/post';
import { formatDateUtil } from '@/lib/formatDateUtil';
import { Badge } from '../common/Badge';
import { getCategoryLabel } from '@/lib/mapCategoryUtil';
import { Button } from '../common/Button';
import { ArrowUpDown } from 'lucide-react';

export const TableColumns: ColumnDef<PostResponse>[] = [
  {
    accessorKey: 'category',
    header: () => <div className="truncate text-center">카테고리</div>,
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      return <div className="truncate text-center font-medium">{getCategoryLabel(category)}</div>;
    },
    minSize: 64,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-full truncate"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        제목
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="truncate">{row.getValue('title')}</div>,
    minSize: 64,
    size: 640,
  },
  {
    accessorKey: 'tags',
    header: () => <div className="truncate text-center">태그</div>,
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="font-medium">
          {row.getValue('tags')}
        </Badge>
      );
    },
    minSize: 64,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-full truncate"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        작성일
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const formatted = formatDateUtil(row.getValue('createdAt'));
      return <div className="truncate text-center">{formatted}</div>;
    },
    minSize: 64,
  },
];
