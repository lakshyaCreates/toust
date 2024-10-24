// * Comnfiguration for authentication
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "@/prisma";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        Resend({
            apiKey: process.env.AUTH_RESEND_KEY,
            from: "something@bhumisharma.com",
        }),
    ],
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
});
