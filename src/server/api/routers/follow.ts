import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { User, Follow } from "@prisma/client";
import { getImageUrlFromS3 } from "@/features/s3";

export const followRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;
      const { session, db } = ctx;

      // 既存のフォローがある場合はエラーメッセージを返す
      const existingFollow = await db.follow.findFirst({
        where: {
          followerId: session.user.id, // フォローする人
          followeeId: userId, // フォローされる人
        },
      });

      if (existingFollow) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Follow already exists",
        });
      }

      // 新しいフォローを作成
      const follow = await db.follow.create({
        data: {
          followerId: session.user.id,
          followeeId: userId,
        },
      });

      if (!follow) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to follow",
        });
      }

      // 通知を作成
      await db.notification.create({
        data: {
          userId: userId,
          notifierUserId: session.user.id,
          notificationType: "follow",
        },
      });

      return { message: "Follow created" };
    }),

  destroy: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;
      const { session, db } = ctx;

      const follow = await db.follow.findFirst({
        where: {
          followerId: session.user.id,
          followeeId: userId,
        },
      });

      if (!follow) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Follow not found" });
      }

      await db.follow.delete({
        where: { id: follow.id },
      });

      return { message: "Successfully unfollowed" };
    }),

  followers: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const [user, currentUser] = await Promise.all([
        ctx.db.user.findUnique({
          where: { id: userId },
        }),
        ctx.db.user.findUnique({
          where: { id: ctx.session.user.id },
          include: {
            followers: {
              include: {
                follower: true,
              },
            },
            followees: true,
          },
        }),
      ]);

      if (!user || !currentUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      return Promise.all(
        currentUser.followers.map(({ follower }) =>
          serializeFollowerUser(follower, currentUser),
        ),
      );
    }),

  followings: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const [user, currentUser] = await Promise.all([
        ctx.db.user.findUnique({
          where: { id: userId },
        }),
        ctx.db.user.findUnique({
          where: { id: ctx.session.user.id },
          include: {
            followees: {
              select: {
                followee: true,
              },
            },
            followers: true,
          },
        }),
      ]);

      if (!user || !currentUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      return Promise.all(
        currentUser.followees.map(({ followee }) =>
          serializeFollowingUser(followee, currentUser),
        ),
      );
    }),
});

async function serializeFollowerUser(
  user: User,
  currentUser: User & {
    followers: {
      follower: User;
    }[];
    followees: Follow[];
  },
) {
  const imageUrl = await getImageUrlFromS3(user.imageS3Key);
  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.image,
    isFollowee: currentUser.followees.some(
      ({ followeeId }) => followeeId === user.id,
    ),
    isFollower: currentUser.followers.some(
      ({ follower: { id } }) => id === user.id,
    ),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function serializeFollowingUser(
  user: User,
  currentUser: User & {
    followers: Follow[];
    followees: {
      followee: User;
    }[];
  },
) {
  const imageUrl = await getImageUrlFromS3(user.imageS3Key);
  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.image,
    isFollowee: currentUser.followees.some(
      ({ followee: { id } }) => id === user.id,
    ),
    isFollower: currentUser.followers.some(
      ({ followerId }) => followerId === user.id,
    ),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
