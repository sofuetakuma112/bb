export type SerializeFollowFollowerUser = {
  id: string;
  name: string | null;
  imageUrl: string | null;
  isFollowee: boolean;
  isFollower: boolean;
  unreadNotificationCount: number | undefined;
  createdAt: Date;
  updatedAt: Date;
};
