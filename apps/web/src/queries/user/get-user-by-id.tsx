"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import db from "@workspace/db";

export async function getUserById(id: string) {
    cacheTag("user", "currentUser", "users");
    return await db.user.findUnique({
        where: {
            id,
        },
    });
}
