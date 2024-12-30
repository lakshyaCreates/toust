"use cache";

import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

import db from "@/prisma";

export async function getToastsByWebsiteId(websiteId: string) {
    cacheTag("toasts", "website-toasts", `toasts-${websiteId}`);

    return await db.toast.findMany({
        where: {
            websiteId,
        },
        orderBy: {
            order: "asc",
        },
    });
}

export async function getUserById(id: string) {
    cacheTag("user", "dbUser", "userId", `user-$${id}`);

    return await db.user.findUnique({
        where: {
            id,
        },
    });
}

export async function getWebsiteByUserId(userId: string) {
    cacheTag("user-websites", "websites");

    return await db.website.findMany({
        where: {
            userId,
        },
    });
}

export async function getWebsiteByDomain(domain: string) {
    cacheTag("website", "domain", `website-${domain}`);

    return await db.website.findUnique({
        where: {
            domain,
        },
    });
}
