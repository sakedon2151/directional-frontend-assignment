import axios from 'axios';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      if (typeof window !== 'undefined') window.location.href = '/';
    }
    if (error.response?.status === 500) {
      const msg = error.response?.data?.message || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      console.error('[500 Server Error]', msg);
      toast.error(msg);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
