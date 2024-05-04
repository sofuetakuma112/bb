import React from "react";
import Profile from "@/app/(authenticated)/[userId]/(home)/profile";
import Tab from "@/app/(authenticated)/[userId]/(home)/tabs";
import { PostCard } from "@/components/card";
import { getSuperLikePosts, getUserPosts } from "@/features/fetch/post";
import { getUser } from "@/features/fetch/user";
import { getServerAuthSession } from "@/server/auth";
import type { SerializedPost } from "@/features/types/trpc/post";

export default async function HomePage({
  params,
}: Readonly<{
  params: { userId: string };
}>) {
  const [userPostsResponse, userResponse, superLikePostsResponse] =
    await Promise.all([
      getUserPosts(params.userId),
      getUser(params.userId),
      getSuperLikePosts(params.userId),
    ]);

  const { posts } = userPostsResponse;
  const { user } = userResponse;
  const { posts: superLikePosts } = superLikePostsResponse;

  const session = await getServerAuthSession();
  const currentUser = session.user;

  return (
    <div className="flex flex-col px-4 pt-4 sm:px-12 sm:pb-[100px] sm:pt-9">
      <div className="text-left">
        <Profile
          profileUrl={user.imageUrl ?? ""}
          currentUserId={currentUser.id}
          userId={params.userId}
          userName={user.name ?? ""}
          followerCount={user.followerCount}
          followingCount={user.followingCount}
          isFollowee={user.isFollowee}
        />
      </div>
      <Tab
        userId={params.userId}
        posts={posts}
        superLikePosts={superLikePosts}
      />
      <div className="flex flex-col pt-4 sm:pb-[100px] sm:pt-9">
        <Cards currentUserId={currentUser.id} posts={posts} />
      </div>
    </div>
  );
}

type CardsProps = {
  currentUserId: string;
  posts: SerializedPost[];
};

async function Cards({ currentUserId, posts }: CardsProps) {
  return (
    <div className="mt-4 grid w-full gap-x-16 gap-y-9 pb-16 sm:mt-7 sm:w-auto sm:pb-0 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {posts.map((post) => (
        <PostCard
          postId={post.id}
          imageUrl={post.imageUrl ?? ""}
          imageName={post.imageName}
          analysisResult={post.analysisResult}
          profileUrl={post.user.imageUrl ?? ""}
          currentUserId={currentUserId}
          userId={post.user.id}
          userName={post.user.name ?? ""}
          key={post.id}
          hashTags={post.hashTags as string[]}
          prompt={post.prompt}
        />
      ))}
    </div>
  );
}
