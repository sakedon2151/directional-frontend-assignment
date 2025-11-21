'use client';

import { QueryProvider } from '@/providers/QueryProvider';
import { SonnerProvider } from '@/providers/SonnerProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SonnerProvider>
      <QueryProvider>{children}</QueryProvider>
    </SonnerProvider>
  );
};
