import { PostCategory } from '@/constants';

export type PostRequest = {
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
};

export type PostResponse = {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
  createdAt: string | Date;
};

export type GetMyPostsParams = {
  limit?: number;
  prevCursor?: string;
  nextCursor?: string;
  sort?: 'createdAt' | 'title';
  order?: 'asc' | 'desc';
  category?: PostCategory;
  from?: string;
  to?: string;
  search?: string;
};

export type GetMyPostsResponse = {
  items: PostResponse[];
  nextCursor?: string;
  prevCursor?: string;
};

export type GetMockPostsResponse = {
  items: PostResponse[];
};

export type DeleteMyPostsResponse = {
  ok: boolean;
  deleted: number;
}
