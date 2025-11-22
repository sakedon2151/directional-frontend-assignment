import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, deleteMyPosts, deletePost, updatePost } from '@/api/post';
import { PostRequest } from '@/types/post';
import { handleAxiosError } from '@/lib/handleAxiosError';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
      toast.success('게시글이 작성되었습니다.');
      router.push(`/posts/${data.id}`);
    },
    onError: (error) => {
      console.error(handleAxiosError(error));
      toast.error('게시글 작성에 실패했습니다.');
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PostRequest }) => updatePost(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['post', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
      toast.success('게시글이 수정되었습니다.');
    },
    onError: (error) => {
      console.error(handleAxiosError(error));
      toast.error('게시글 수정에 실패했습니다.');
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
      toast.success('게시글이 삭제되었습니다.');
      router.push('/posts');
    },
    onError: (error) => {
      console.error(handleAxiosError(error));
      toast.error('게시글 삭제에 실패했습니다.');
    },
  });
};

export const useDeleteMyPostsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMyPosts,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['myPosts'] });
      toast.success(`${data.deleted}개의 게시글이 삭제되었습니다.`);
    },
    onError: (error) => {
      console.error(handleAxiosError(error));
      toast.error('게시글 삭제에 실패했습니다.');
    },
  });
};
