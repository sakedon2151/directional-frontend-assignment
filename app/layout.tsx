import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/Providers';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Directional Frontend Assignment',
  description: 'Directional Frontend Assignment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.className} min-w-xs antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
