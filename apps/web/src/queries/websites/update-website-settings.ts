"use server";

import { revalidateTag } from "next/cache";

import db from "@workspace/db";

type Data = {
    waitFor: number;
    toastEvery: number;
    toastDuration: number;
};

export async function updateWebsiteSettings(data: Data, id: string) {
    await db.website.update({
        data,
        where: {
            id,
        },
    });
    revalidateTag("website");
    return;
}
