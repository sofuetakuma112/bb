'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useFollow } from '@/features/hooks/useFollow';
import { Button } from '@/features/ui/button';
import { Card } from '@/features/ui/card';

type Props = {
  profileUrl: string;
  userId: string;
  userName: string;
  isFollowee: boolean;
  className?: string;
};

function UserCard({
  profileUrl,
  userId,
  userName,
  isFollowee: initialIsFollowing,
  className,
}: Props) {
  const { isFollowee, isLoading, handleFollow, handleUnfollow } = useFollow(initialIsFollowing);

  return (
    <Card variant="list" color="white" className={clsx('flex-col overflow-hidden', className)}>
      <div className="h-[256px]">
        {/* TODO: Imageコンポーネントに置き換える */}
        <Link href={`/${userId}/home`}>
          <img src={profileUrl} alt="ユーザープロフィール画像" className="size-full object-cover" />
        </Link>
      </div>
      <div className="px-2 pb-4 pt-1">
        <Link href={`/${userId}/home`}>
          <p className="text-black-black pb-3 text-2xl font-semibold">{userName}</p>
        </Link>
        <div className="flex justify-center">
          {isFollowee ? (
            <Button
              variant="following"
              font="bold"
              className="text-black-black"
              onClick={() => handleUnfollow(userId)}
              disabled={isLoading}
            >
              フォロー中
            </Button>
          ) : (
            <Button
              variant="follow"
              font="bold"
              className="text-white-white"
              onClick={() => handleFollow(userId)}
              disabled={isLoading}
            >
              フォロー
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export { UserCard };
