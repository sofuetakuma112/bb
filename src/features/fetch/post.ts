import { notFound } from "next/navigation";
import { api } from "@/trpc/server";

async function getUserPosts(userId: string) {
  // const { data: posts, included: users } = await fetchApi<PostsResponse>(`/users/${userId}/posts`, {
  //   cache: 'no-store',
  //   next: { tags: [`/users/${userId}/posts`] },
  // });

  const posts = await api.post.index({
    userId,
  });

  // if (Array.isArray(posts) && posts.length > 0) notFound();
  if (posts == null) notFound();

  return { posts };
}

async function getSuperLikePosts(userId: string) {
  // const { data: posts, included: users } = await fetchApi<LikePostsResponse>(
  //   `/users/${userId}/like_posts/super_like`,
  //   {
  //     cache: "no-store",
  //     next: { tags: [`/users/${userId}/super-like`] },
  //   },
  // );

  const posts = await api.like.likePosts({
    userId,
    likeType: "super_like",
  })

  if (
    Array.isArray(posts) &&
    posts.length > 0
  )
    notFound();
  if (posts == null) notFound();

  return { posts };
}

export { getUserPosts, getSuperLikePosts };
