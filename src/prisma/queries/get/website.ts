"use server";

import db from "@/prisma";

export async function getWebsiteById(websiteId: string) {
    const res = await db.website.findUnique({
        where: {
            id: websiteId,
        },
    });

    if (res) {
        return res;
    } else return null;
}
