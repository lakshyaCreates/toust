// * Comnfiguration for authentication
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { Plan } from "@prisma/client";

import { getUserById } from "./prisma/queries/get/user";
import db from "@/prisma";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/signin",
        verifyRequest: "/signin/email-sent",
        error: "/signin/error",
    },
    providers: [
        Resend({
            apiKey: process.env.AUTH_RESEND_KEY,
            from: "something@bhumisharma.com",
        }),
    ],
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    callbacks: {
        async session({ token, session }) {
            if (!token.email) {
                throw new Error("No email found in token");
            }

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.plan && session.user) {
                session.user.plan = token.plan as Plan;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.plan = token.plan as Plan;
            }

            return session;
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.name = existingUser.name;
            token.email = existingUser.email;
            token.plan = existingUser.plan;

            return token;
        },
    },
});
