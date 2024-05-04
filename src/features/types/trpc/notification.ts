import type { $Enums } from "@prisma/client";

export type SerializedNotifierUser = {
  id: string;
  name: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SerializedNotification = {
  id: string;
  notificationType: $Enums.NotificationType;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  notifierUser: SerializedNotifierUser;
};
