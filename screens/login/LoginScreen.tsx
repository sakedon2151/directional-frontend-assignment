import { LoginForm } from '@/components/login/LoginForm';

export const LoginScreen = () => {
  return (
    <div className="flex h-dvh w-full justify-end bg-slate-800">
      <LoginForm className="m-4 w-full justify-center md:ml-0 md:w-1/2" />
    </div>
  );
};
