"use server";

import db from "@/prisma";

export async function getUserByEmail(email: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    } catch {
        return null;
    }
}

export async function getUserById(id: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    } catch {
        return null;
    }
}

export async function getUserByOrderId(orderId: string) {
    try {
        const user = await db.user.findFirst({
            where: {
                orderId,
            },
        });

        return user;
    } catch {
        return null;
    }
}
