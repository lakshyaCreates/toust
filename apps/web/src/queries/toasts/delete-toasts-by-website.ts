"use server";

import { revalidateTag } from "next/cache";

import db from "@workspace/db";

export async function deleteToastsByWebsite(websiteId: string) {
    await db.toast.deleteMany({
        where: {
            websiteId,
        },
    });

    revalidateTag(`toasts-${websiteId}`);
    return;
}
