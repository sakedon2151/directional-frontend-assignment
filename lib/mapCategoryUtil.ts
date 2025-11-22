import { PostCategory } from '@/constants';

const categoryMap: Record<PostCategory, string> = {
  [PostCategory.FREE]: '자유',
  [PostCategory.QNA]: '질문',
  [PostCategory.NOTICE]: '공지',
};

export const getCategoryLabel = (category: PostCategory | string): string => {
  return categoryMap[category as PostCategory] || category;
};
