'use client';

import { Toaster } from '@/components/common/Sonner';

export const SonnerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
};
