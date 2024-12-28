import { unstable_cacheTag as cacheTag } from "next/cache";

import db from "..";

export async function getUserById(id: string) {
    "use cache";
    cacheTag("user", "dbUser", "userId", `user-$${id}`);

    return await db.user.findUnique({
        where: {
            id,
        },
    });
}
