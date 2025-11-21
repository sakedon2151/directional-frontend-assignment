import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/api/login';
import { handleAxiosError } from '@/lib/handleAxiosError';
import { useRouter } from 'next/navigation';

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      router.replace('/posts');
      sessionStorage.setItem('token', data.token);
    },
    onError: (error) => {
      console.error(handleAxiosError(error));
      // 토스트
    },
  });
};
