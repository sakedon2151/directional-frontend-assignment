import { AxiosError } from 'axios';

export const handleAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    return `[${error.request?.state}] ${message}`;
  }
  return 'Unexpected error occurred';
};
