import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { Notification, User } from "@prisma/client";
import { getImageUrlFromS3 } from "@/features/s3";

export const notificationRouter = createTRPCRouter({
  index: protectedProcedure.query(async ({ ctx }) => {
    try {
      const [notifications, currentUser] = await Promise.all([
        ctx.db.notification.findMany({
          where: { userId: ctx.session.user.id },
          orderBy: { createdAt: "desc" },
          include: { notifierUser: true },
        }),
        ctx.db.user.findUnique({
          where: { id: ctx.session.user.id },
        }),
      ]);

      if (!currentUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      const unreadNotifications = notifications.filter((n) => !n.read);

      await ctx.db.notification.updateMany({
        where: { id: { in: unreadNotifications.map((n) => n.id) } },
        data: { read: true },
      });

      return Promise.all(
        notifications.map((notification) =>
          serializeNotification(notification),
        ),
      );
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      });
    }
  }),
});

async function serializeNotification(
  notification: Notification & { notifierUser: User },
) {
  return {
    id: notification.id,
    notificationType: notification.notificationType,
    read: notification.read,
    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,
    notifierUser: await serializeUser(notification.notifierUser),
  };
}

async function serializeUser(user: User) {
  const imageUrl = await getImageUrlFromS3(user.imageS3Key);
  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
