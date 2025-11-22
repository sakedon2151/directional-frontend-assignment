'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { FieldGroup, Field, FieldLabel, FieldContent, FieldError, FieldSet } from '../common/Field';
import { useUpdatePostMutation } from '@/queries/post/usePostMutation';
import { useGetPostQuery } from '@/queries/post/usePostQuery';
import { PostCategory } from '@/constants';
import { Button } from '../common/Button';
import Link from 'next/link';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { ButtonGroup } from '../common/ButtonGroup';
import { getCategoryLabel } from '@/lib/mapCategoryUtil';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../common/Skeleton';

interface PostUpdateFormProps {
  postId: string;
  className?: string;
}

const postFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.').max(80, '제목은 80자 이하여야 합니다.'),
  body: z.string().min(1, '본문을 입력해주세요.').max(2000, '본문은 2000자 이하여야 합니다.'),
  category: z.enum([PostCategory.NOTICE, PostCategory.QNA, PostCategory.FREE] as [PostCategory, ...PostCategory[]], {
    message: '카테고리를 선택해주세요.',
  }),
  tags: z
    .array(z.string().min(1, '태그는 1자 이상이어야 합니다.').max(24, '태그는 24자 이하여야 합니다.'))
    .max(5, '태그는 최대 5개까지 등록 가능합니다.'),
});

export const PostUpdateForm = (props: PostUpdateFormProps) => {
  const router = useRouter();
  const { postId, className } = props;
  const { data: post, isLoading: isPostLoading } = useGetPostQuery(postId);
  const { mutateAsync, isPending } = useUpdatePostMutation();

  const postForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      body: '',
      category: PostCategory.FREE,
      tags: [],
    },
  });

  // 기존 게시물 데이터를 폼에 채우기
  useEffect(() => {
    if (post) {
      postForm.reset({
        title: post.title,
        body: post.body,
        category: post.category,
        tags: post.tags || [],
      });
    }
  }, [post, postForm]);

  const [tagInput, setTagInput] = useState('');
  const [tagError, setTagError] = useState<string | null>(null);
  const categories: PostCategory[] = [PostCategory.FREE, PostCategory.NOTICE, PostCategory.QNA];

  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    await mutateAsync({ id: postId, payload: data });
    router.push(`/posts/${postId}`);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    setTagError(null);
    if (!trimmedTag) {
      setTagError('태그를 입력해주세요.');
      return;
    }

    if (trimmedTag.length > 24) {
      setTagError('태그는 24자 이하여야 합니다.');
      return;
    }

    const currentTags = postForm.getValues('tags');

    if (currentTags.includes(trimmedTag)) {
      setTagError('이미 등록된 태그입니다.');
      return;
    }

    if (currentTags.length >= 5) {
      setTagError('태그는 최대 5개까지 등록 가능합니다.');
      toast.error('태그는 최대 5개까지 등록 가능합니다.');
      return;
    }

    postForm.setValue('tags', [...currentTags, trimmedTag], { shouldValidate: true });
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = postForm.getValues('tags');
    postForm.setValue(
      'tags',
      currentTags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true },
    );
    setTagError(null);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    setTagError(null);

    if (value.trim().length > 24) {
      setTagError('태그는 24자 이하여야 합니다.');
    }
  };

  const currentTags = postForm.watch('tags');
  const currentCategory = postForm.watch('category');

  if (isPostLoading) {
    return (
      <div className={clsx(className)}>
        <div className="mb-4">
          <Skeleton className="h-10 w-24" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="mx-auto h-8 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={clsx(className)}>
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/posts">
            <ArrowLeft />
            뒤로 가기
          </Link>
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">게시글을 불러오는 중 오류가 발생했습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={clsx(className)}>
      <Button variant="ghost" className="mb-4" asChild>
        <Link href={`/posts/${postId}`}>
          <ArrowLeft />
          뒤로 가기
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">게시글 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="post-update-form" onSubmit={postForm.handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <Controller
                  name="title"
                  control={postForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title">제목</FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          id="title"
                          type="text"
                          placeholder="제목을 입력하세요."
                          minLength={1}
                          maxLength={80}
                          aria-invalid={fieldState.invalid}
                          disabled={isPending}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="category"
                  control={postForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>카테고리</FieldLabel>
                      <FieldContent>
                        <ButtonGroup>
                          {categories.map((category) => {
                            const isActive = currentCategory === category;
                            return (
                              <Button
                                key={category}
                                type="button"
                                variant={isActive ? 'default' : 'outline'}
                                onClick={() => {
                                  field.onChange(category);
                                  if (fieldState.invalid) {
                                    postForm.trigger('category');
                                  }
                                }}
                                className={clsx(isActive && 'bg-primary text-primary-foreground')}
                                disabled={isPending}
                              >
                                {getCategoryLabel(category)}
                              </Button>
                            );
                          })}
                        </ButtonGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="tags"
                  control={postForm.control}
                  render={({ fieldState }) => (
                    <Field data-invalid={fieldState.invalid || !!tagError}>
                      <FieldLabel htmlFor="tags">
                        태그 <span className="text-muted-foreground text-sm font-normal">(최대 5개, 각 24자 이하)</span>
                      </FieldLabel>
                      <FieldContent>
                        <div className="flex gap-2">
                          <Input
                            id="tags"
                            type="text"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            placeholder="태그를 입력해주세요."
                            maxLength={24}
                            disabled={isPending || currentTags.length >= 5}
                            aria-invalid={fieldState.invalid || !!tagError}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddTag}
                            disabled={isPending || currentTags.length >= 5}
                          >
                            추가
                          </Button>
                        </div>
                        {currentTags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {currentTags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-secondary text-secondary-foreground inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTag(tag)}
                                  className="hover:text-destructive focus:outline-none"
                                  aria-label={`${tag} 태그 제거`}
                                  disabled={isPending}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        {tagError && (
                          <FieldError>
                            <span className="text-destructive text-sm">{tagError}</span>
                          </FieldError>
                        )}
                        {fieldState.invalid && !tagError && <FieldError errors={[fieldState.error]} />}
                        {currentTags.length >= 5 && (
                          <p className="text-muted-foreground text-sm">태그는 최대 5개까지 등록 가능합니다.</p>
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="body"
                  control={postForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="body">본문</FieldLabel>
                      <FieldContent>
                        <Textarea
                          {...field}
                          id="body"
                          placeholder="본문을 입력하세요."
                          maxLength={2000}
                          rows={15}
                          aria-invalid={fieldState.invalid}
                          disabled={isPending}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </FieldContent>
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
        <div className="px-6 pb-6">
          <Field>
            <Button type="submit" form="post-update-form" disabled={isPending} className="w-full">
              {isPending ? (
                <>
                  <LoaderCircle className="animate-spin" aria-hidden />
                  수정 중...
                </>
              ) : (
                '수정하기'
              )}
            </Button>
          </Field>
        </div>
      </Card>
    </div>
  );
};
