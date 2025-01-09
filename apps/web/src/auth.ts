import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@workspace/db";

import authConfig from "./auth.config";
import { getUserById } from "@/queries";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    // pages: {
    //     signIn: "/",
    // },
    callbacks: {
        async session({ token, session }) {
            if (!token.email) {
                throw new Error("No email found in token");
            }

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
            }

            return session;
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.name = existingUser.name;
            token.email = existingUser.email;

            return token;
        },
    },
    ...authConfig,
});
