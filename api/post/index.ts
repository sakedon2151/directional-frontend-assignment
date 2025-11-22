import {
  DeleteMyPostsResponse,
  GetMockPostsResponse,
  GetMyPostsParams,
  GetMyPostsResponse,
  PostRequest,
  PostResponse,
} from '@/types/post';
import axiosInstance from '../axios';

// 다중 처리
export const getMyPosts = async (params: GetMyPostsParams): Promise<GetMyPostsResponse> => {
  const { data } = await axiosInstance.get('/posts', { params });
  return data;
};

export const getMockPosts = async (count: number): Promise<GetMockPostsResponse> => {
  const { data } = await axiosInstance.get('/mock/posts', { params: { count } });
  return data;
};

export const deleteMyPosts = async (): Promise<DeleteMyPostsResponse> => {
  const { data } = await axiosInstance.delete('/posts');
  return data;
};

// 단일 처리
export const getPost = async (id: string): Promise<PostResponse> => {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
};

export const createPost = async (payload: PostRequest): Promise<PostResponse> => {
  const { data } = await axiosInstance.post('/posts', payload);
  return data;
};

export const updatePost = async (id: string, payload: PostRequest): Promise<PostResponse> => {
  const { data } = await axiosInstance.patch(`/posts/${id}`, payload);
  return data;
};

export const deletePost = async (id: string): Promise<DeleteMyPostsResponse> => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);
  return data;
};
