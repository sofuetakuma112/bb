import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Button } from "@/features/ui/button";
import { Icon } from "@/features/ui/icon";
import { convertToJST } from "@/features/utils";
import type { SerializedNotifierUser } from "@/features/types/trpc/notification";
import type { $Enums } from "@prisma/client";
import { api } from "@/trpc/server";

export default async function NotificationsPage() {
  // const { data: notifications, included: users } = await fetchApi<NotificationsResponse>(
  //   '/notifications',
  //   { cache: 'no-store' }
  // );

  const notifications = await api.notification.index();
  if (notifications == null) notFound();

  return (
    <div className="flex flex-col items-center pt-5">
      <Button variant="ghost" className="border-amber-400">
        <Icon name="notification-white" width="28" height="28" />
      </Button>
      <h1 className="mt-4 h-8 w-[168px] text-center text-xl font-semibold sm:text-2xl">
        通知
      </h1>
      <div className="mt-4 w-full px-4 sm:mt-8 sm:px-0">
        {notifications.map((notification) => {
          return (
            <UserStatus
              key={notification.id}
              notificationType={notification.notificationType}
              notifierUser={notification.notifierUser}
              createdAt={notification.createdAt.toString()}
            />
          );
        })}
      </div>
    </div>
  );
}

type UserStatusProps = {
  notificationType: $Enums.NotificationType;
  notifierUser: SerializedNotifierUser;
  createdAt: string;
};

function UserStatus({
  notificationType,
  notifierUser,
  createdAt,
}: UserStatusProps) {
  const userDetailPagePath = `/${notifierUser.id}/home`;
  const userName = <Link href={userDetailPagePath}>{notifierUser.name}</Link>;

  return (
    <div className="mx-auto mt-2 flex w-full max-w-[400px] items-center justify-between gap-x-4">
      <div className="flex gap-x-2">
        <Link href={userDetailPagePath}>
          <div className="size-8 overflow-hidden rounded-sm sm:size-12">
            <img
              className="size-full object-cover"
              src={notifierUser.imageUrl ?? ""}
              alt="userImage"
            />
          </div>
        </Link>
        {notificationType === "like" ? (
          <p className="flex items-center">{userName}にいいねされました</p>
        ) : notificationType === "follow" ? (
          <p className="flex items-center">{userName}にフォローされました</p>
        ) : notificationType === "super_like" ? (
          <p className="flex items-center">
            {userName}にスーパーライクされました
          </p>
        ) : null}
      </div>
      <p className="text-gray-300">{convertToJST(createdAt)}</p>
    </div>
  );
}
