"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { env } from "@/env/server";
import { getUserById } from "@/prisma/helpers";

export async function ensureUser() {
    const session = await auth();
    if (!session || !session.user || !session.user.id)
        redirect(`${env.SIGNIN_REDIRECT_URL}`);

    const user = await getUserById(session.user.id);
    if (!user || !user.id) redirect(`${env.SIGNIN_REDIRECT_URL}`);

    return user.id;
}
