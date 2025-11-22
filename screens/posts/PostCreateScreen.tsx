'use client';

import { PostCreateForm } from '@/components/post/PostCreateForm';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const PostCreateScreen = (props: Props) => {
  return (
    <div className={clsx(props.className)}>
      <PostCreateForm className="m-4" />
    </div>
  );
};
