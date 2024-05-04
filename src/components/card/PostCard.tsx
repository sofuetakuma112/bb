"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import RemoveLikeButton from "@/app/(authenticated)/[userId]/likes/removeLikeButton";
import { deletePost } from "@/features/actions/post";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import { Card } from "@/features/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/ui/dialog";
import { Icon } from "@/features/ui/icon";

type PromptDialogProps = {
  imageUrl: string;
  analysisResult?: boolean | null;
  currentUserId?: string;
  userId: string;
  postId?: string;
  pageType?: "likes" | "posts";
  hashTags?: string[];
  prompt?: string;
  isUnderReviewPost: boolean;
};

function PromptDialog({
  imageUrl,
  analysisResult,
  hashTags,
  prompt,
  isUnderReviewPost,
}: PromptDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="block size-full">
          <div className="h-full overflow-hidden rounded-2xl">
            <img
              src={imageUrl}
              alt="AI画像"
              className={clsx("size-full object-cover")}
            />
          </div>
          <div
            className={clsx("h-full overflow-hidden rounded-2xl", {
              "absolute inset-0 flex items-center justify-center bg-gray-600":
                isUnderReviewPost,
              "absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-80":
                analysisResult == null && !isUnderReviewPost,
            })}
          >
            <span className="text-xl text-white-white">審査中</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ハッシュタグ</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {hashTags?.map((hashTag, i) => (
            <Badge
              key={`${imageUrl}-${hashTag}-${i}`}
              className={clsx("mr-1", { hidden: isUnderReviewPost })}
            >
              {hashTag}
            </Badge>
          ))}
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>プロンプト</DialogTitle>
        </DialogHeader>
        <DialogDescription className={clsx({ hidden: isUnderReviewPost })}>
          {prompt}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

type DeletePostDialogProps = { postId: string; userId: string };

function DeletePostDialog({ postId, userId }: DeletePostDialogProps) {
  // TODO: 編集フォームのUI実装する
  return (
    <Dialog>
      <DialogTrigger className="absolute right-2 top-2">
        <Icon name="trash-can" width="23" height="26" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>投稿を削除しますか？</DialogTitle>
          <DialogDescription>この処理はもとに戻せません</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <DialogClose asChild>
            <Button
              variant="delete"
              className="m-2"
              onClick={() => deletePost(postId, userId)}
            >
              削除する
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="close" className="m-2">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type Props = {
  pageType?: "likes" | "posts";
  imageUrl: string;
  imageName: string;
  profileUrl: string;
  currentUserId?: string;
  userId: string;
  userName: string;
  postId?: string;
  analysisResult?: boolean | null;
  likeId?: string;
  hashTags?: string[];
  prompt?: string;
};

function PostCard({
  imageUrl,
  imageName,
  profileUrl,
  currentUserId,
  userId,
  userName,
  postId,
  analysisResult,
  pageType = "posts",
  hashTags,
  prompt,
}: Props) {
  const isUnderReviewPost = currentUserId !== userId && analysisResult === null;
  return (
    <Card
      variant="list"
      color="transparent"
      className={clsx("mx-auto flex flex-col", {
        hidden: analysisResult === false,
      })}
    >
      <div className={clsx("relative h-[270px] pb-1")}>
        <PromptDialog
          imageUrl={imageUrl}
          analysisResult={analysisResult}
          userId={userId}
          postId={postId}
          currentUserId={currentUserId}
          pageType={pageType}
          hashTags={hashTags}
          prompt={prompt}
          isUnderReviewPost={isUnderReviewPost}
        />
        {currentUserId === userId && pageType === "posts" && postId && (
          <DeletePostDialog postId={postId} userId={userId} />
        )}
        {pageType === "likes" && postId && (
          <RemoveLikeButton userId={userId} postId={postId} />
        )}
      </div>
      <p className={clsx("pb-1 text-lg font-semibold")}>
        {imageName}
      </p>
      <div className="flex">
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
            <span className="text-base text-gray-600">{userName}</span>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export { PostCard };
