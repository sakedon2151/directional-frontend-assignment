import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPost, getMockPosts, getMyPosts } from '@/api/post';
import { GetMyPostsParams } from '@/types/post';

export const useGetMyPostsQuery = (params?: GetMyPostsParams) => {
  return useInfiniteQuery({
    queryKey: ['myPosts', params],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) => {
      return getMyPosts({
        ...params,
        nextCursor: pageParam,
      });
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
  });
};

export const useGetPostQuery = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });
};

export const useGetMockPostsQuery = (count: number) => {
  return useQuery({
    queryKey: ['mockPosts', count],
    queryFn: () => getMockPosts(count),
  });
};
