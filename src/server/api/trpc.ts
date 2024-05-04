/**

*　このファイルを編集する必要がある場合は、以下の場合を除きほとんどありません:
*　1. リクエストコンテキストを変更したい場合 (パート1を参照してください)。
*　2. 新しいミドウェアまたはプロシージャのタイプを作成したい場合 (パート3を参照してください)。

*　要約 - ここでは、すべてのtRPCサーバー関連の機能が作成され、組み込まれています。使用する必要がある部分は、
*　ファイルの最後の方で適切にドキュメント化されています。
*/

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

/**
 *
 * コンテキスト
 *
 * このセクションでは、バックエンドAPIで利用可能な「コンテキスト」を定義しています。
 * これにより、リクエストを処理する際に、データベース、セッションなどにアクセスすることができます。
 * このヘルパー関数は、tRPCコンテキストの「内部」を生成します。APIハンドラとRSCクライアントは、
 * それぞれこれをラップし、必要なコンテキストを提供します。
 *@see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerAuthSession();

  return {
    db,
    session,
    ...opts,
  };
};

/**
 * 2. 初期化
 *
 * ここでtRPC APIが初期化され、コンテキストとトランスフォーマーが接続される。
 * また、ZodErrorsを解析し、
 * バックエンドの検証エラーによってプロシージャが失敗した場合に、
 * フロントエンドで型安全性を確保できるようにします。
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * サーバー側の呼び出し元を作成する。
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**

* 3. ルーターとプロシージャ (重要な部分)
* これらは、tRPC APIを構築するために使用する部品です。"/src/server/api/routers"ディレクトリでは、
* これらをたくさんインポートすることになるでしょう。
*/

/**
 * これは、tRPC APIで新しいルーターとサブルーターを作成する方法です。
 *@see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
* パブリック（未認証）プロシージャ

* これは、tRPC APIで新しいクエリやミューテーションを構築するために使用する基本的な部品です。
* クエリを実行するユーザーが認証されていることを保証するものではありませんが、ログインしている場合は
* ユーザーセッションデータにアクセスすることができます。
*/
export const publicProcedure = t.procedure;

/**
* 保護（認証済み）プロシージャ

* クエリやミューテーションをログインユーザーのみがアクセスできるようにしたい場合は、これを使用してください。
* これは、セッションが有効であることを検証し、ctx.session.userが null でないことを保証します。

* @see https://trpc.io/docs/procedures
*/
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
