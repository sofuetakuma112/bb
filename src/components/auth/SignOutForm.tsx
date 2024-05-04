'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
import { Button } from '@/features/ui/button';

export default function SignOutForm() {
  return (
    <Button variant="delete" className="m-2" onClick={() => signOut()}>
      ログアウト
    </Button>
  );
}
