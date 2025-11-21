'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import clsx from 'clsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../common/Card';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '../common/Field';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useLoginMutation } from '@/queries/login/useLoginMutation';
import { LoaderCircle } from 'lucide-react';

interface LoginFormProps {
  className?: string;
}

const loginFormSchema = z.object({
  email: z.email().min(1, '유효한 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export const LoginForm = (props: LoginFormProps) => {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isPending } = useLoginMutation();

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    await mutateAsync(data);
  };

  return (
    <Card className={clsx(props.className)}>
      <CardHeader>
        <CardTitle className="text-4xl">로그인</CardTitle>
        <CardDescription>이메일로 로그인해주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={loginForm.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Controller
                name="email"
                control={loginForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">이메일</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="abc123@email.com"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={loginForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="login-form" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin" aria-hidden />
                로그인 중...
              </>
            ) : (
              '로그인'
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
