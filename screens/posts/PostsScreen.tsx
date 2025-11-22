'use client';

import { TableColumns } from '@/components/post/TableColumns';
import { PostTable } from '@/components/post/PostTable';
import { useGetMyPostsQuery } from '@/queries/post/usePostQuery';
import { useMemo } from 'react';
import { usePostFilterStore } from '@/hooks/usePostFilterStore';
import { GetMyPostsParams } from '@/types/post';

export const PostsScreen = () => {
  const category = usePostFilterStore((state) => state.category);
  const search = usePostFilterStore((state) => state.search);
  const sort = usePostFilterStore((state) => state.sort);
  const order = usePostFilterStore((state) => state.order);

  const params = useMemo<GetMyPostsParams>(() => {
    const params: GetMyPostsParams = {};
    if (category) params.category = category;
    if (search.trim()) params.search = search.trim();
    if (sort) params.sort = sort;
    if (order) params.order = order;
    return params;
  }, [category, search, sort, order]);

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
