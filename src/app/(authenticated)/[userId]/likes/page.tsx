import { notFound } from "next/navigation";
import React from "react";
import { PostCard } from "@/components/card";
import { Button } from "@/features/ui/button";
import { Icon } from "@/features/ui/icon";
import { api } from "@/trpc/server";

type LikePageProps = {
  params: { userId: string };
};

export default async function LikesPage({ params }: LikePageProps) {
  return (
    <div className="flex flex-col items-center pb-[100px] pt-5">
      {/*Todo: onClickでフォロー/アンフォロー処理を実装するならcomponentで切る*/}
      <Button variant="ghost" className="border-amber-400">
        <Icon name="like-white" width="28" height="28" />
      </Button>
      <h1 className="mt-4 h-8 w-[168px] text-center text-2xl font-semibold">
        いいね一覧
      </h1>
      <div className="mt-12">
        <Cards userId={params.userId} />
      </div>
    </div>
  );
}

type CardsProps = {
  userId: string;
};
async function Cards({ userId }: CardsProps) {
  // const { data: likedPosts, included: users } = await fetchApi<LikePostsResponse>(
  //   `/users/${userId}/like_posts/like`,
  //   {
  //     cache: 'no-store',
  //   }
  // );

  const likedPosts = await api.like.likePosts({
    userId,
    likeType: "like",
  });
  if (likedPosts == null) notFound();

  return (
    <div className="grid gap-x-16 gap-y-9 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 2xl:grid-cols-4">
      {likedPosts.map((post) => (
        <PostCard
          postId={post.id}
          pageType="likes"
          userId={post.user.id}
          key={post.userId}
          imageUrl={post.imageUrl ?? ""}
          imageName={post.imageName}
          profileUrl={post.user.imageUrl ?? ""}
          userName={post.user.name ?? ""}
          analysisResult={post.analysisResult}
          hashTags={post.hashTags as string[]}
          prompt={post.prompt}
        />
      ))}
    </div>
  );
}
