"use server";

import { revalidateTag } from "next/cache";

import db from "@/prisma";

export async function addWebsite({
    values,
    userId,
}: {
    values: { domain: string; note?: string };
    userId: string;
}) {
    "use server";

    const res = await db.website.create({
        select: {
            id: true,
        },
        data: {
            ...values,
            userId,
        },
    });

    revalidateTag("user-websites");

    return res;
}
