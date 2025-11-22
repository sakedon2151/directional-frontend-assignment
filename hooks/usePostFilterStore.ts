import { create } from 'zustand';
import { PostCategory } from '@/constants';
import { GetMyPostsParams } from '@/types/post';

interface PostFilterState {
  category: PostCategory | undefined;
  search: string;
  sort: 'createdAt' | 'title' | undefined;
  order: 'asc' | 'desc' | undefined;

  setCategory: (category: PostCategory | undefined) => void;
  setSearch: (search: string) => void;
  setSort: (sort: 'createdAt' | 'title' | undefined) => void;
  setOrder: (order: 'asc' | 'desc' | undefined) => void;
  reset: () => void;

  toParams: () => GetMyPostsParams;
}

const initialState = {
  category: undefined,
  search: '',
  sort: undefined,
  order: undefined,
};

export const usePostFilterStore = create<PostFilterState>((set, get) => ({
  ...initialState,

  setCategory: (category) => set({ category }),
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  setOrder: (order) => set({ order }),
  reset: () => set(initialState),
  toParams: () => {
    const { category, search, sort, order } = get();
    const params: GetMyPostsParams = {};

    if (category) params.category = category;
    if (search.trim()) params.search = search.trim();
    if (sort) params.sort = sort;
    if (order) params.order = order;

    return params;
  },
}));
