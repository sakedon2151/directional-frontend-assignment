'use client';

import { PostUpdateForm } from '@/components/post/PostUpdateForm';
import { useParams } from 'next/navigation';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const PostUpdateScreen = (props: Props) => {
  const params = useParams();
  const postId = params?.id as string;

  return (
    <div className={clsx(props.className)}>
      <PostUpdateForm postId={postId} className="m-4" />
    </div>
  );
};
