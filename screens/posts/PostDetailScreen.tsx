'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetPostQuery } from '@/queries/post/usePostQuery';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Skeleton } from '@/components/common/Skeleton';
import { formatDateUtil } from '@/lib/formatDateUtil';
import { getCategoryLabel } from '@/lib/mapCategoryUtil';
import { ArrowLeft, Edit } from 'lucide-react';
import Link from 'next/link';

export const PostDetailScreen = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [userId, setUserId] = useState<string | null>(null);

  const { data: post, isLoading, isError, error } = useGetPostQuery(id);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userString = sessionStorage.getItem('user');
      if (userString) {
        try {
          const user = JSON.parse(userString);
          setUserId(user.id);
        } catch (error) {
          console.error('Failed to parse user from sessionStorage:', error);
        }
      }
    }
  }, []);

  const isOwner = userId && post && userId === post.userId;

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <div className="mb-4">
          <Skeleton className="h-10 w-24" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="mb-2 h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2" />
          뒤로 가기
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">게시글을 불러오는 중 오류가 발생했습니다.</p>
            {error && (
              <p className="text-destructive mt-2 text-sm">
                {error instanceof Error ? error.message : '알 수 없는 오류'}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2" />
          뒤로 가기
        </Button>
        {isOwner && (
          <Button asChild>
            <Link href={`/posts/${id}/update`}>
              <Edit className="mr-2 h-4 w-4" />
              수정하기
            </Link>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="mb-2 text-2xl">{post.title}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-3">
                <Badge variant="outline">{getCategoryLabel(post.category)}</Badge>
                <span className="text-muted-foreground text-sm">{formatDateUtil(post.createdAt.toString())}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none">
            <p className="text-base leading-relaxed whitespace-pre-wrap">{post.body}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 border-t pt-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
