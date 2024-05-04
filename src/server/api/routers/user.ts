import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { User, Post, Like, Follow, Notification } from "@prisma/client";
import { getImageUrlFromS3 } from "@/features/s3";

const UserCreateInput = z.object({
  name: z.string().optional(),
  imageS3Key: z.string().optional(),
});

const UserUpdateInput = UserCreateInput.extend({
  id: z.string(),
});

export const userRouter = createTRPCRouter({
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        posts: true,
        receivedNotifications: true,
        likes: true,
        followers: true,
        followees: true,
      },
    });
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }
    return serializeUser(user, user);
  }),

  show: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [user, currentUser] = await Promise.all([
        ctx.db.user.findUnique({
          where: { id: input.id },
          include: {
            posts: true,
            likes: true,
            followers: true,
            followees: true,
          },
        }),
        ctx.db.user.findUnique({
          where: { id: ctx.session.user.id },
          include: {
            receivedNotifications: true,
            followers: true,
            followees: true,
          },
        }),
      ]);
      if (!user || !currentUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      return serializeUser(user, currentUser);
    }),

  update: protectedProcedure
    .input(UserUpdateInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      await ctx.db.user.update({
        where: { id: user.id },
        data: input,
      });

      return { message: "User updated" };
    }),
});

async function serializeUser(
  user: User & {
    posts: Post[];
    likes: Like[];
    followers: Follow[];
    followees: Follow[];
  },
  currentUser: User & {
    followers: Follow[];
    followees: Follow[];
    receivedNotifications: Notification[];
  },
) {
  const imageUrl = await getImageUrlFromS3(user.imageS3Key);
  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.image,
    isFollowee: currentUser.followees.some(
      (followee) => followee.followeeId === user.id,
    ),
    isFollower: currentUser.followers.some(
      (follower) => follower.followerId === user.id,
    ),
    unreadNotificationCount:
      user.id === currentUser.id
        ? currentUser.receivedNotifications.filter((n) => !n.read).length
        : undefined,
    postCount: user.posts.filter(
      (p) => p.analysisResult === true || p.analysisResult === null,
    ).length,
    likeCount: user.likes.filter((l) => l.likeType === "like").length,
    superLikeCount: user.likes.filter((l) => l.likeType === "super_like")
      .length,
    followerCount: user.followers.length,
    followingCount: user.followees.length,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
