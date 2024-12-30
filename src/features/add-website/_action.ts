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

    data.map(
        async (d) =>
            await db.toast.create({
                data: {
                    ...d,
                    websiteId: res.id,
                },
            }),
    );

    return res;
}

const data = [
    {
        title: "Sample Toast 01",
        author: "Netflix",
        timeAgo: "now",
        order: 0,
    },
    {
        title: "Sample Toast 02",
        author: "Amazon",
        timeAgo: "3m ago",
        order: 1,
    },
    {
        title: "Sample Toast 03",
        author: "Stripe",
        timeAgo: "1h ago",
        order: 2,
    },
];
