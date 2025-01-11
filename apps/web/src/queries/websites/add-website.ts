"use server";

import { revalidateTag } from "next/cache";

import db from "@workspace/db";

export async function addWebsite(data: {
    domain: string;
    note?: string;
    userId: string;
}) {
    const res = await db.website.create({
        data,
    });

    if (!res) throw "Failed to add website";
    revalidateTag(`websites-${data.userId}`);
}
