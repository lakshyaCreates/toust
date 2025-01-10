"use server";

import { getUserById } from ".";

import { auth } from "@/auth";

export async function getCurrentUser() {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.id) return null;

    return await getUserById(user.id);
}
