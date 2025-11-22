'use client';

import clsx from 'clsx';
import { CategoryToggle } from './CategoryToggle';
import { SearchInput } from './SearchInput';
import { SortDropdown } from './SortDropdown';
import { ButtonGroup } from '../common/ButtonGroup';

interface PostFilterProps {
  className?: string;
  children: React.ReactNode;
}

export const PostFilter = (postFilterProps: PostFilterProps) => {
  return (
    <div className={clsx(postFilterProps.className)}>
      <CategoryToggle />
      <SearchInput />
      <ButtonGroup>
        {postFilterProps.children}
        <SortDropdown />
      </ButtonGroup>
    </div>
  );
};
