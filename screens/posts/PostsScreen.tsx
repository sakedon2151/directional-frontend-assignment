'use client';

import { TableColumns } from '@/components/post/TableColumns';
import { PostTable } from '@/components/post/PostTable';
import { useGetMyPostsQuery } from '@/queries/post/usePostQuery';
import { useMemo } from 'react';
import { usePostFilterStore } from '@/hooks/usePostFilterStore';

export const PostsScreen = () => {
  const toParams = usePostFilterStore((state) => state.toParams);
  const params = toParams();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetMyPostsQuery(params);

  const flattenedData = useMemo(() => {
    const allItems = data?.pages.flatMap((page) => page.items) ?? [];
    const seenIds = new Set<string>();
    return allItems.filter((item) => {
      if (seenIds.has(item.id)) {
        return false;
      }
      seenIds.add(item.id);
      return true;
    });
  }, [data]);

  return (
    <div className="">
      <PostTable
        columns={TableColumns}
        data={flattenedData}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
