import type { UserRequest, UserResponse } from '@/types/user';
import axios from 'axios';

export const postLogin = async (payload: UserRequest): Promise<UserResponse> => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, payload);
  return data;
};
