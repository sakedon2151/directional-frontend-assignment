import { useQuery } from '@tanstack/react-query';
import { getPost, getMockPosts, getMyPosts } from '@/api/post';
import { GetMyPostsParams } from '@/types/post';

export const useGetMyPostsQuery = (params: GetMyPostsParams) => {
  return useQuery({
    queryKey: ['myPosts', params],
    queryFn: () => getMyPosts(params),
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
