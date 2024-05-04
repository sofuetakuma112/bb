import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { Like, Post, User, Prisma } from "@prisma/client";
import { getImageUrlFromS3 } from "@/features/s3";
import type {
  SerializedUser,
  SerializedPost,
} from "@/features/types/trpc/post";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  index: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      const posts = await ctx.db.post.findMany({
        where: {
          userId: user.id,
          OR: [{ analysisResult: null }, { analysisResult: true }],
        },
        include: {
          user: true,
          likes: {
            where: { likeType: "super_like" },
            take: 1,
            orderBy: { createdAt: "desc" },
            include: { user: true },
          },
        },
      });
      return Promise.all(posts.map((post) => serializePost(post)));
    }),

  create: protectedProcedure
    .input(
      z.object({
        imageS3Key: z.string(),
        imageName: z.string(),
        imageAge: z.string(),
        prompt: z.string(),
        hashTags: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          ...input,
          analysisResult: true,
          userId: ctx.session.user.id, // ctx.session.user.idが利用可能で正しいと仮定した場合
        },
      });
      return post;
    }),

  // createWithAnalysis: publicProcedure
  //   .input(
  //     z.object({
  //       analysisScore: z.number(),
  //       analysisResult: z.boolean(),
  //       modelVersion: z.string(),
  //       imageS3Key: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     // Perform async post analysis job here
  //     // Example:
  //     // await postAnalysisJob(input);
  //     return { message: "Post analysis started" };
  //   }),

  recommended: protectedProcedure.query(async ({ ctx }) => {
    const likePostIds = (
      await ctx.db.like.findMany({
        where: { userId: ctx.session.user.id },
        select: { postId: true },
      })
    ).map((like) => like.postId);

    const recommendedPosts = await ctx.db.post.findMany({
      where: {
        analysisResult: true,
        NOT: [{ userId: ctx.session.user.id }, { id: { in: likePostIds } }],
      },
      orderBy: { id: "desc" },
      take: 50,
      include: {
        user: true,
        likes: {
          where: { likeType: "super_like" },
          take: 1,
          orderBy: { createdAt: "desc" },
          include: { user: true },
        },
      },
    });

    return Promise.all(recommendedPosts.map(serializePost));
  }),

  followings: protectedProcedure.query(async ({ ctx }) => {
    // ログインユーザーがフォローしているユーザーのid配列
    const followingUserIds = (
      await ctx.db.follow.findMany({
        where: { followerId: ctx.session.user.id },
        select: { followeeId: true },
      })
    ).map((follow) => follow.followeeId);

    const superLikePostIds = (
      await ctx.db.like.findMany({
        where: {
          userId: { in: followingUserIds },
          likeType: "super_like",
        },
        distinct: ["postId"],
        select: { postId: true },
      })
    ).map((like) => like.postId);

    const myLikesPostIds = (
      await ctx.db.like.findMany({
        where: { userId: ctx.session.user.id },
        select: { postId: true },
      })
    ).map((like) => like.postId);

    const followingPosts = await ctx.db.post.findMany({
      where: {
        analysisResult: true,
        userId: { in: followingUserIds },
        NOT: [
          { id: { in: superLikePostIds } },
          { userId: ctx.session.user.id },
          { id: { in: myLikesPostIds } },
        ],
      },
      orderBy: { id: "desc" },
      take: 25,
      include: {
        user: true,
        likes: {
          where: { likeType: "super_like" },
          take: 1,
          orderBy: { createdAt: "desc" },
          include: { user: true },
        },
      },
    });

    const superLikedPosts = await ctx.db.post.findMany({
      where: {
        analysisResult: true,
        id: { in: superLikePostIds },
        NOT: [{ userId: ctx.session.user.id }, { id: { in: myLikesPostIds } }],
      },
      orderBy: { id: "desc" },
      take: 25,
      include: {
        user: true,
        likes: {
          where: { likeType: "super_like" },
          take: 1,
          orderBy: { createdAt: "desc" },
          include: { user: true },
        },
      },
    });

    return Promise.all(
      [...superLikedPosts, ...followingPosts].map(serializePost),
    );
  }),

  detail: protectedProcedure.query(async ({ ctx }) => {
    const postDetail = await ctx.db.post.findFirst({
      where: { analysisResult: true },
      include: {
        user: true,
        likes: {
          where: { likeType: "super_like" },
          take: 1,
          orderBy: { createdAt: "desc" },
          include: { user: true },
        },
      },
    });

    if (!postDetail) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
    }

    return postDetail;
  }),

  destroy: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({
        where: { id: input.postId, userId: ctx.session.user.id },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      await ctx.db.post.delete({ where: { id: post.id } });

      return { message: "Post deleted successfully" };
    }),

  like: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        likeType: z.enum(["unlike", "like", "super_like"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { postId, likeType } = input;

      const existingLike = await ctx.db.like.findFirst({
        where: { postId, userId: ctx.session.user.id },
      });

      if (existingLike) {
        await ctx.db.like.update({
          where: { id: existingLike.id },
          data: { likeType },
        });
      } else {
        await ctx.db.like.create({
          data: {
            postId,
            userId: ctx.session.user.id,
            likeType,
          },
        });
      }

      const post = await ctx.db.post.findUnique({ where: { id: postId } });
      if (
        post &&
        post.userId !== ctx.session.user.id &&
        likeType !== "unlike"
      ) {
        await ctx.db.notification.create({
          data: {
            userId: post.userId,
            postId,
            notifierUserId: ctx.session.user.id,
            notificationType:
              likeType as Prisma.NotificationCreateInput["notificationType"],
          },
        });
      }

      return { message: "Like updated successfully" };
    }),
  likeUsers: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        likeType: z.enum(["like", "super_like"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { postId, likeType } = input;

      const likes = await ctx.db.like.findMany({
        where: { postId, likeType },
        select: { userId: true },
      });

      if (likes.length === 0) {
        return [];
      }

      const users = await ctx.db.user.findMany({
        where: { id: { in: likes.map((like) => like.userId) } },
      });

      return users;
    }),
  destroyLike: protectedProcedure
    .input(z.object({ likeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const like = await ctx.db.like.findUnique({
        where: { id: input.likeId },
      });

      if (!like) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Like not found" });
      }

      await ctx.db.like.delete({ where: { id: like.id } });

      return { message: "Like deleted successfully" };
    }),
});

async function serializePost(
  post: Post & {
    user: User;
    likes: Like[];
  },
): Promise<SerializedPost> {
  const imageUrl = await getImageUrlFromS3(post.imageS3Key);

  return {
    id: post.id,
    prompt: post.prompt,
    imageUrl,
    analysisResult: post.analysisResult,
    likeCount: post.likes.filter((l) => l.likeType === "like").length,
    superLikeCount: post.likes.filter((l) => l.likeType === "super_like")
      .length,
    userId: post.userId,
    hashTags: post.hashTags,
    imageName: post.imageName,
    imageAge: post.imageAge,
    imageBirthplace: post.imageBirthplace,
    user: await serializeUser(post.user),
  };
}

async function serializeUser(user: User): Promise<SerializedUser> {
  const imageUrl = await getImageUrlFromS3(user.imageS3Key);

  return {
    id: user.id,
    name: user.name,
    imageUrl: imageUrl || user.image,
  };
}
