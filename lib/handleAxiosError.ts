import { AxiosError } from 'axios';

export const handleAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const msg = error.response?.data?.message || error.message;
    return `[${error.request?.state}] ${msg}`;
  }
  return 'Unexpected error occurred';
};
