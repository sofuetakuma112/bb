import { notFound } from "next/navigation";
import React from "react";
import { UserCard } from "@/components/card";
import { UserItem } from "@/components/item";
import { Button } from "@/features/ui/button";
import { Icon } from "@/features/ui/icon";
import { api } from "@/trpc/server";

type FollowersPageProps = {
  params: { userId: string };
};

export default async function FollowersPage({ params }: FollowersPageProps) {
  return (
    <div className="flex flex-col items-center pb-[100px] pt-5">
      {/*Todo: onClickでフォロー/アンフォロー処理を実装するならcomponentで切る*/}
      <Button variant="ghost" size="smIcon" className="border-amber-400">
        <Icon name="follower-white" width="32" height="32" />
      </Button>
      <h1 className="mb-4 mt-2 h-8 w-[168px] text-center text-xl font-semibold sm:mb-8 sm:mt-4 sm:text-2xl">
        フォロワー一覧
      </h1>
      <Cards userId={params.userId} />
    </div>
  );
}

type CardsProps = {
  userId: string;
};

async function Cards({ userId }: CardsProps) {
  // const { data: followerUsers } = await fetchApi<FollowerUsersResponse>(
  //   `/users/${userId}/followers`,
  //   { cache: 'no-store' }
  // );

  const followerUsers = await api.follow.followers({
    userId,
  });

  if (followerUsers == null) notFound();

  return (
    <div className="w-full gap-x-16 gap-y-9 px-4 sm:grid sm:w-auto sm:grid-cols-2 sm:px-8 lg:grid-cols-3 2xl:grid-cols-4">
      {followerUsers.map((followerUser) => (
        <>
          <UserCard
            profileUrl={followerUser.imageUrl ?? ""}
            userId={followerUser.id}
            userName={followerUser.name ?? ""}
            isFollowee={followerUser.isFollowee}
            key={followerUser.id}
            className="hidden sm:block"
          />
          <UserItem
            profileUrl={followerUser.imageUrl ?? ""}
            userId={followerUser.id}
            userName={followerUser.name ?? ""}
            isFollowee={followerUser.isFollowee}
            key={followerUser.id}
            className="sm:hidden"
          />
        </>
      ))}
    </div>
  );
}
