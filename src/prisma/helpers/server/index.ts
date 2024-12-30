"use server";

import { revalidateTag } from "next/cache";

import { Toast } from "@prisma/client";

import db from "@/prisma";

export async function saveToasts(data: Toast[]) {
    await db.toast.createMany({
        data: data,
    });

    const websiteId = data[0].websiteId;

    revalidateTag(`toast-${websiteId}`);
    revalidateTag("toasts");

    return;
}

export async function deleteToasts(websiteId: string) {
    await db.toast.deleteMany({
        where: {
            websiteId,
        },
    });
}
