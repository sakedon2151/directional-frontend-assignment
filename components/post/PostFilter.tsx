'use client';

import clsx from 'clsx';
import { CategoryToggle } from './CategoryToggle';
import { SearchInput } from './SearchInput';
import { SortDropdown } from './SortDropdown';
import { ButtonGroup } from '../common/ButtonGroup';
import { Button } from '../common/Button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

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
      <Button variant="default" asChild>
        <Link href='/posts/create'>
          <Pencil />새 글 작성
        </Link>
      </Button>
    </div>
  );
};
