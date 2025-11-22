'use client';

import { Header } from '@tanstack/react-table';
import clsx from 'clsx';

interface ColumnResizerProps<TData> {
  header: Header<TData, unknown>;
}

export function ColumnResizer<TData>({ header }: ColumnResizerProps<TData>) {
  if (!header.column.getCanResize()) {
    return null;
  }

  return (
    <div
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className="user-select-none before:bg-border absolute top-0 -right-2 z-10 flex h-full w-4 cursor-col-resize touch-none justify-center group-last/head:hidden before:absolute before:inset-y-0 before:w-px before:translate-x-px"
      style={{
        userSelect: 'none',
        touchAction: 'none',
      }}
    />
  );
}
