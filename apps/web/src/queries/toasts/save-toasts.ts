"use server";

import { revalidateTag } from "next/cache";

import { Toast } from "@prisma/client";
import db from "@workspace/db";

export async function saveToasts(data: Toast[]) {
    await db.toast.createMany({
        data,
    });

    revalidateTag(`toasts-${data[0]!.websiteId}`);
    return;
}
