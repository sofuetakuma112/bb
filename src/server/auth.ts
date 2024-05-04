import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  type Session,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { getImageUrlFromS3 } from "@/features/s3";

/**
* next-authの型に対するモジュール拡張です。これにより、sessionオブジェクトにカスタムプロパティを
* 追加し、型の安全性を維持することができます。

* @see https://next-auth.js.org/getting-started/typescript#module-augmentation
*/
declare module "next-auth" {
  interface User {
    imageS3Key: string;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      image: string;
      name: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * NextAuth.jsのオプションで、アダプタ、プロバイダ、コールバックなどを設定します。
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const imageUrl = await getImageUrlFromS3(user.imageS3Key);

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          image: imageUrl || user.image,
          name: user.name,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    /**
     * ...ここに他のプロバイダーを追加する。
     *
     * 他のほとんどのプロバイダーは、Discordプロバイダーよりも少し手間がかかる。
     * たとえば GitHub プロバイダでは、
     * Account モデルに `refresh_token_expires_in` フィールドを追加する必要があります。
     * 使いたいプロバイダのNextAuth.jsドキュメントを参照してください。例:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
  },
};

/**
 * getServerSession` のラッパーのため、ファイルごとに `authOptions` をインポートする必要がない。
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (): Promise<Session> => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  return session;
};
