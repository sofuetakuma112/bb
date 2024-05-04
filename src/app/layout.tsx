import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { IconDefs } from '@/features/ui/icon/IconDefs';
import { TRPCReactProvider } from '@/trpc/react';

export const metadata: Metadata = {
  title: 'BeauBelle',
  description: 'AIで生成 した 美女 の画像をシェアする新たな SNS',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <IconDefs />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
