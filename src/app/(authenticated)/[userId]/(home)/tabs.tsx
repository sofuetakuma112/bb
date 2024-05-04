"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/features/ui/tabs";
import type { SerializedPost } from "@/features/types/trpc/post";
import type { SerializedLikedPost } from "@/features/types/trpc/like";

type TabProps = {
  userId: string;
  posts: SerializedPost[];
  superLikePosts: SerializedLikedPost[];
};

export default function Tab({
  userId,
  posts,
  superLikePosts,
}: Readonly<TabProps>) {
  const pathname = usePathname();
  const selectedTab = pathname.split("/")[2];
  return (
    <Tabs
      defaultValue={selectedTab}
      style={{ height: "100%" }}
      className="mt-8 h-10 w-full max-w-[1072px] border-b-2 sm:mt-[64px]"
    >
      <div className="flex h-10">
        <TabsList className="flex gap-[48px]" variant="text">
          <TabsTrigger value="home" variant="profileText">
            <Link href={`/${userId}/home`} className="flex gap-8">
              <p>投稿</p>
              <p>{posts.length}</p>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="super-likes" variant="profileText">
            <Link href={`/${userId}/super-likes`} className="flex gap-8">
              <p>スーパーライク</p>
              <p>{superLikePosts.length}</p>
            </Link>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
}
