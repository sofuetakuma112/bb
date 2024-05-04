import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { Like, Post, User } from "@prisma/client";
import type {
  SerializedLikedPost,
  SerializedUser,
} from "@/features/types/trpc/like";
import { getImageUrlFromS3 } from "@/features/s3";

export const likeRouter = createTRPCRouter({
  likePosts: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        likeType: z.enum(["like", "super_like", "unlike"]),
        searchString: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId, likeType, searchString } = input;

      const user = await ctx.db.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      let posts = [];

      if (likeType === "like") {
        posts = await ctx.db.post.findMany({
          where: {
            likes: {
              some: {
                userId: user.id,
                likeType: { in: ["like", "super_like"] },
              },
            },
            analysisResult: true,
          },
          include: {
            user: true,
            likes: {
              where: {
                userId: ctx.session.user.id,
                likeType: "super_like",
              },
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
              include: {
                user: true,
              },
            },
          },
        });
      } else {
        posts = await ctx.db.post.findMany({
          where: {
            likes: {
              some: {
                userId: user.id,
                likeType: likeType,
              },
            },
            analysisResult: true,
          },
          include: {
            user: true,
            likes: {
              where: {
                userId: ctx.session.user.id,
                likeType: "super_like",
              },
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
              include: {
                user: true,
              },
            },
          },
        });
      }

      if (searchString) {
        posts = posts.filter(
          (post) =>
            post.hashTags &&
            Array.isArray(post.hashTags) &&
            post.hashTags.includes(searchString),
        );
      }

      return Promise.all(posts.map((post) => serializePost(post)));
    }),
});

async function serializePost(
  post: Post & {
    user: User;
    likes: (Like & {
      user: User;
    })[];
  },
): Promise<SerializedLikedPost> {
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
    superLikeUser: post.likes[0]?.user ?? null,
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
