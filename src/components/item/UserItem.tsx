'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useFollow } from '@/features/hooks/useFollow';
import { Button } from '@/features/ui/button';

type Props = {
  profileUrl: string;
  userId: string;
  userName: string;
  isFollowee: boolean;
  className?: string;
};

function UserItem({
  profileUrl,
  userId,
  userName,
  isFollowee: initialIsFollowing,
  className,
}: Props) {
  const { isFollowee, isLoading, handleFollow, handleUnfollow } = useFollow(initialIsFollowing);

  return (
    <div className={clsx('flex w-full justify-between gap-y-2 overflow-hidden', className)}>
      <div className="flex">
        <div className="mr-2 size-8 overflow-hidden rounded-full">
          {/* TODO: Imageコンポーネントに置き換える */}
          <Link href={`/${userId}/home`}>
            <img
              src={profileUrl}
              alt="ユーザープロフィール画像"
              className="size-full object-cover"
            />
          </Link>
        </div>
        <Link href={`/${userId}/home`} className="flex items-center">
          <p className="text-black-black pb-3 text-lg font-semibold">{userName}</p>
        </Link>
      </div>
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
  );
}

export { UserItem };
