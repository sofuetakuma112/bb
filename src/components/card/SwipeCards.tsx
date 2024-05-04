"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SkeletonCard } from "@/components/card";
import {
  followingCurrentIndexAtom,
  followingCurrentScrollIndexAtom,
  recommendCurrentIndexAtom,
  recommendCurrentScrollIndexAtom,
} from "@/features/atoms/swipeCards";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import { Card } from "@/features/ui/card";
import { Icon } from "@/features/ui/icon";
import { api } from "@/trpc/react";

type SwipeCardProps = {
  imageUrl: string;
  name: string;
  age: number;
  profileUrl: string;
  userName: string;
  userId: string;
  hashTags: string[];
  prompt: string;
  isSuperLikePost: boolean;
  currentScrollIndex: number;
  handleLike: () => void;
  handleSuperLike: () => void;
  handleNope: () => void;
  handleReload: () => void;
  handleScroll: (type: "up" | "down") => void;
};

function SwipeCard({
  imageUrl,
  name,
  age,
  profileUrl,
  userName,
  userId,
  hashTags,
  prompt,
  isSuperLikePost,
  currentScrollIndex,
  handleLike,
  handleSuperLike,
  handleNope,
  handleReload,
  handleScroll,
}: SwipeCardProps) {
  return (
    <Card
      variant="single"
      color={isSuperLikePost ? "superlike" : "blue"}
      className="relative flex h-full flex-col sm:max-h-[785px]"
    >
      <div
        className={clsx("absolute left-4 top-4 z-10 flex sm:left-8 sm:top-6", {
          block: currentScrollIndex === 0,
          hidden: currentScrollIndex > 0,
        })}
      >
        <Link href={`/${userId}/home`}>
          <div className="mr-1 size-9 overflow-hidden rounded-lg">
            {/* TODO: Imageコンポーネントに置き換える */}
            <img
              src={profileUrl}
              alt="ユーザープロフィール画像"
              className="size-full object-cover"
            />
          </div>
        </Link>
        <div className="flex items-center">
          <Link href={`/${userId}/home`}>
            <span className="text-base text-white sm:text-black-black">
              {userName}
            </span>
          </Link>
        </div>
      </div>
      <div
        className={clsx(
          "absolute left-4 top-14 z-10 sm:left-1/2 sm:top-6 sm:-translate-x-1/2",
          {
            block: currentScrollIndex === 0,
            hidden: currentScrollIndex > 0,
          },
        )}
      >
        {isSuperLikePost && (
          <div className="flex items-center">
            <Icon name="super-like" width="32" height="32" />
            <span className="pl-2 text-sm font-bold text-blue-300">
              superlikeされた投稿です！！
            </span>
          </div>
        )}
      </div>
      <div
        className={clsx("absolute right-2 top-2 z-10 sm:right-8 sm:top-6", {
          block: currentScrollIndex === 0,
          hidden: currentScrollIndex > 0,
        })}
      >
        <Button
          variant="outline"
          size="smIcon"
          className="bg-white-white"
          onClick={handleReload}
        >
          <Icon name="reload" width="32" height="32" />
        </Button>
      </div>
      <div
        className={clsx(
          "absolute left-1/2 top-[10%] z-10 hidden -translate-x-1/2 sm:block",
          {
            "sm:hidden": currentScrollIndex === 0,
          },
        )}
      >
        <Button
          variant="ghost"
          size="smIcon"
          className="bg-white-white"
          onClick={() => handleScroll("up")}
        >
          <Icon
            name="arrow-down"
            className="size-[18px] rotate-180 sm:size-[28px]"
          />
        </Button>
      </div>
      <div
        className={clsx(
          "absolute bottom-[15%] left-1/2 z-10 hidden -translate-x-1/2 sm:block",
          {
            "sm:hidden": currentScrollIndex === 2,
          },
        )}
      >
        <Button
          variant="ghost"
          size="smIcon"
          className="bg-white-white"
          onClick={() => handleScroll("down")}
        >
          <Icon name="arrow-down" className="size-[18px] sm:size-[28px]" />
        </Button>
      </div>
      {/* PC */}
      <div className="hidden h-full overflow-y-hidden rounded-3xl sm:block">
        {/* 1 */}
        <div
          className={clsx("flex h-full transition-transform duration-500", {
            "translate-y-0": currentScrollIndex === 0,
            "-translate-y-full": currentScrollIndex === 1,
            "translate-y-[-200%]": currentScrollIndex === 2,
          })}
        >
          <div className="flex-1">
            {/* TODO: Imageコンポーネントに置き換える */}
            <img
              src={imageUrl}
              alt="AI画像"
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="my-auto">
              <span className="pr-4 text-5xl text-white-white">{name}</span>
              <span className="text-4xl text-white-white">{age}</span>
            </div>
          </div>
        </div>
        {/* 2 */}
        <div
          className={clsx(
            "flex h-full flex-col items-center justify-center px-8 transition-transform duration-500 xl:px-32",
            {
              "-translate-y-full": currentScrollIndex === 1,
              "translate-y-[-200%]": currentScrollIndex === 2,
            },
          )}
        >
          <p className="text-center text-2xl font-bold">ハッシュタグ</p>
          <div className="inline-flex flex-wrap gap-x-3 gap-y-6 pt-9">
            {hashTags.map((hashTag, i) => (
              <Badge key={`${imageUrl}-${hashTag}-${i}`}>{hashTag}</Badge>
            ))}
          </div>
        </div>
        {/* 3 */}
        <div
          className={clsx(
            "flex h-full flex-col items-center justify-center px-8 transition-transform duration-500 xl:px-32",
            {
              "-translate-y-full": currentScrollIndex === 1,
              "translate-y-[-200%]": currentScrollIndex === 2,
            },
          )}
        >
          <p className="text-center text-2xl font-bold">プロンプト</p>
          <p className="mt-9 rounded-2xl bg-white p-6 text-xl font-semibold text-slate-800">
            {prompt}
          </p>
        </div>
      </div>
      {/* SP */}
      <div className="scrollbar-hide block h-full overflow-y-scroll rounded-3xl sm:hidden">
        {/* 1 */}
        <div className="relative flex h-full">
          <div className="flex-1">
            {/* TODO: Imageコンポーネントに置き換える */}
            <img
              src={imageUrl}
              alt="AI画像"
              className="size-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="pr-4 text-2xl font-semibold text-white">
              {name}
            </span>
            <span className="text-xl font-semibold text-white">{age}</span>
          </div>
        </div>
        {/* 2 */}
        <div
          className={clsx(
            "flex h-full flex-col items-center justify-center px-8",
          )}
        >
          <p className="text-center text-2xl font-bold">ハッシュタグ</p>
          <div className="inline-flex flex-wrap gap-x-3 gap-y-6 pt-9">
            {hashTags.map((hashTag, i) => (
              <Badge key={`${imageUrl}-${hashTag}-${i}`}>{hashTag}</Badge>
            ))}
          </div>
        </div>
        {/* 3 */}
        <div className={clsx("flex h-full flex-col items-center px-8 pt-8")}>
          <p className="text-center text-2xl font-bold">プロンプト</p>
          <p className="mt-9 rounded-2xl bg-white p-6 text-xl font-semibold text-slate-800">
            {prompt}
          </p>
        </div>
      </div>
      {/* PC */}
      <div className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 gap-x-16 sm:-bottom-12 sm:flex">
        <Button
          variant="outline"
          size="lgIcon"
          className="bg-white-white"
          onClick={handleNope}
        >
          <Icon name="nope" className="size-8 sm:size-16" />
        </Button>
        <Button
          variant="outline"
          size="lgIcon"
          className="bg-white-white"
          onClick={handleSuperLike}
        >
          <Icon name="super-like" className="size-8 sm:size-16" />
        </Button>
        <Button
          variant="outline"
          size="lgIcon"
          className="bg-white-white"
          onClick={handleLike}
        >
          <Icon name="like" className="size-8 sm:size-16" />
        </Button>
      </div>
      {/* SP */}
      <div className="absolute bottom-2 right-2 flex gap-x-2 sm:hidden">
        <Button
          variant="outline"
          size="smIcon"
          className="bg-white-white"
          onClick={handleNope}
        >
          <Icon name="nope" className="size-6" />
        </Button>
        <Button
          variant="outline"
          size="smIcon"
          className="bg-white-white"
          onClick={handleSuperLike}
        >
          <Icon name="super-like" className="size-6" />
        </Button>
        <Button
          variant="outline"
          size="smIcon"
          className="bg-white-white"
          onClick={handleLike}
        >
          <Icon name="like" className="size-6" />
        </Button>
      </div>
    </Card>
  );
}

type TopPagePosts = {
  recommended: ReturnType<typeof api.post.recommended.useQuery>;
  followings: ReturnType<typeof api.post.followings.useQuery>;
};

function fetcher(type: keyof TopPagePosts) {
  if (type === "recommended") {
    return api.post.recommended.useQuery();
  } else if (type === "followings") {
    return api.post.followings.useQuery();
  }

  throw Error("invalid type");
}

type LikeType = "like" | "super_like" | "unlike";

function NoCard() {
  return (
    <div className="flex h-full items-center justify-center text-xl">
      表示する女性がいません
    </div>
  );
}

type SwipeCardsProps = {
  tabValue: string;
  type: keyof TopPagePosts;
};

function SwipeCards({ tabValue, type }: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useAtom(
    tabValue === "recommend"
      ? recommendCurrentIndexAtom
      : followingCurrentIndexAtom,
  );
  const [currentScrollIndex, setCurrentScrollIndex] = useAtom(
    tabValue === "recommend"
      ? recommendCurrentScrollIndexAtom
      : followingCurrentScrollIndexAtom,
  );

  const [noMoreCards, setNoMoreCards] = useState(false);

  const { data: posts, isLoading, refetch } = fetcher(type);
  // ESLintエラーは出ないが、ifでreturnするコードより上で呼ばないと実行時エラーになる
  const likeMutation = api.post.like.useMutation();

  useEffect(() => {
    if (noMoreCards) {
      refetch(); // データの再フェッチをトリガー
      setNoMoreCards(false); // カードがない状態をセット
    }
  }, [noMoreCards, refetch]);

  const [cacheDeleted, setCacheDeleted] = useState(false);

  useEffect(() => {
    if (!cacheDeleted && !isLoading && posts == null) {
      setCacheDeleted(true);
      refetch();
    }
  }, [cacheDeleted, isLoading, refetch, posts]);

  if (isLoading || posts == null) {
    return <SkeletonCard />;
  }

  const currentPost = posts[currentIndex];
  if (!currentPost) return <NoCard />;

  async function like(postId: string, likeType: LikeType) {
    return likeMutation.mutateAsync({
      postId,
      likeType,
    });
  }

  const handleLike = async () => {
    const postId = posts[currentIndex]?.id;
    if (!postId) return;

    await like(postId, "like");
    if (currentScrollIndex !== 0) {
      setCurrentScrollIndex(0);
    }
    handleSetCurrentIndex(currentIndex + 1);
  };
  const handleSuperLike = async () => {
    const postId = posts[currentIndex]?.id;
    if (!postId) return;

    await like(postId, "super_like");
    if (currentScrollIndex !== 0) {
      setCurrentScrollIndex(0);
    }
    handleSetCurrentIndex(currentIndex + 1);
  };
  const handleNope = async () => {
    const postId = posts[currentIndex]?.id;
    if (!postId) return;

    await like(postId, "unlike");
    if (currentScrollIndex !== 0) {
      setCurrentScrollIndex(0);
    }
    handleSetCurrentIndex(currentIndex + 1);
  };
  const handleReload = () => {
    // TODO: リロード処理を実装する
    refetch();
    handleSetCurrentIndex(0);
  };
  const handleScroll = (type: "up" | "down") => {
    // 現在のカードに基づいて次のカードを表示
    setCurrentScrollIndex((current) =>
      type === "up" ? current - 1 : current + 1,
    );
  };
  const handleSetCurrentIndex = (nextIndex: number) => {
    if (nextIndex >= posts.length) {
      setCurrentIndex(0); // カードを最初から表示
      setNoMoreCards(true); // カードがない状態をセット
      return;
    }
    if (nextIndex === posts.length) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(nextIndex);
  };

  return posts.length === 0 ? (
    <NoCard />
  ) : (
    <SwipeCard
      imageUrl={currentPost.imageUrl ?? ""}
      name={currentPost.imageName}
      age={Number(currentPost.imageAge)}
      profileUrl={currentPost.user.imageUrl ?? ""}
      userName={currentPost.user.name ?? ""}
      userId={currentPost.user.id}
      hashTags={currentPost.hashTags as string[]}
      prompt={currentPost.prompt}
      isSuperLikePost={Number(currentPost.superLikeCount) > 0}
      currentScrollIndex={currentScrollIndex}
      handleLike={handleLike}
      handleSuperLike={handleSuperLike}
      handleNope={handleNope}
      handleReload={handleReload}
      handleScroll={handleScroll}
    />
  );
}

export { SwipeCards };
