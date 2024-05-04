import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { likeRouter } from "@/server/api/routers/like";
import { notificationRouter } from "@/server/api/routers/notification";
import { userRouter } from "@/server/api/routers/user";
import { followRouter } from "@/server/api/routers/follow";

/**
 * これはサーバーのプライマリルーターです。
 *
 * api/routersに追加されたルーターはすべて、ここに手動で追加する必要がある。
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  notification: notificationRouter,
  like: likeRouter,
  follow: followRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * tRPC APIのサーバー側呼び出し元を作成する。
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
