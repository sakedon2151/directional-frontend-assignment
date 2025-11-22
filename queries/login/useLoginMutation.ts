import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/api/login';
import { handleAxiosError } from '@/lib/handleAxiosError';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      router.replace('/posts');
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      toast.success('로그인 되었습니다.');
    },
    onError: (error) => {
      console.error(handleAxiosError(error));
      toast.error('유효하지 않은 이메일 또는 패스워드 입니다.');
    },
  });
};
