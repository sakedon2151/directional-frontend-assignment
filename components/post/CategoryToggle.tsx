'use client';

import { Button } from '../common/Button';
import { ButtonGroup } from '../common/ButtonGroup';
import { usePostFilterStore } from '@/hooks/usePostFilterStore';
import { PostCategory } from '@/constants';
import { getCategoryLabel } from '@/lib/mapCategoryUtil';
import clsx from 'clsx';

export const CategoryToggle = () => {
  const category = usePostFilterStore((state) => state.category);
  const setCategory = usePostFilterStore((state) => state.setCategory);

  const categories: (PostCategory | undefined)[] = [
    undefined,
    PostCategory.NOTICE,
    PostCategory.FREE,
    PostCategory.QNA,
  ];

  return (
    <ButtonGroup>
      {categories.map((cat) => {
        const isActive = category === cat;
        const label = cat ? getCategoryLabel(cat) : '전체';

        return (
          <Button
            key={cat || 'all'}
            variant={isActive ? 'default' : 'outline'}
            onClick={() => setCategory(cat)}
            className={clsx(isActive && 'bg-primary text-primary-foreground')}
          >
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
