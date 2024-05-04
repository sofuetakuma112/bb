import React from "react";
import Profile from "@/app/(authenticated)/[userId]/(home)/profile";
import Tab from "@/app/(authenticated)/[userId]/(home)/tabs";
import { PostCard } from "@/components/card";
import { getSuperLikePosts, getUserPosts } from "@/features/fetch/post";
import { getUser } from "@/features/fetch/user";
import { getServerAuthSession } from "@/server/auth";

export default async function SuperLikesPage({
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
          currentUserId={currentUser.id}
          profileUrl={user.imageUrl ?? ""}
          userId={params.userId}
          userName={user.name ?? ''}
          followers={user.followerCount}
          following={user.followingCount}
          isFollowee={user.isFollowee ?? false}
        />
      </div>
      <Tab
        userId={params.userId}
        posts={posts}
        superLikePosts={superLikePosts}
      />
      <div className="flex flex-col pt-4 sm:pb-[100px] sm:pt-9">
        <Cards userId={params.userId} />
      </div>
    </div>
  );
}

type CardsProps = {
  userId: string;
};

async function Cards({ userId }: CardsProps) {
  const { posts } = await getSuperLikePosts(userId);

  return (
    <div className="mt-4 grid w-full gap-x-16 gap-y-9 pb-16 sm:mt-7 sm:w-auto sm:pb-0 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {posts.map(async (post) => {
        return (
          <PostCard
            postId={post.id}
            imageUrl={post.imageUrl ?? ""}
            imageName={post.imageName}
            analysisResult={post.analysisResult}
            profileUrl={post.user.imageUrl ?? ""}
            userId={post.user.id}
            userName={post.user.name ?? ""}
            key={post.id}
            hashTags={post.hashTags as string[]}
            prompt={post.prompt}
          />
        );
      })}
    </div>
  );
}
