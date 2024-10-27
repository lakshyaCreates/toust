"use server";

import db from "@/prisma";

export async function deleteToust(toustId: string) {
    const res = await db.toust.delete({
        where: {
            id: toustId,
        },
    });

    if (res.id) {
        return {
            success: true,
            message: "Toust Deleted",
        };
    } else {
        return {
            success: false,
            message: "Error deleting Toust",
        };
    }
}
