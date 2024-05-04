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
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
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
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
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
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/login',
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
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
