"use server";

import { OrderStatus, Plan } from "@prisma/client";

import db from "@/prisma";

interface UpdateUser {
    name?: string;
    email?: string;
    plan?: Plan;
    orderId?: string;
    orderStatus?: OrderStatus;
    paymentId?: string;
    image?: string;
}

export async function updateUserById(id: string, values: UpdateUser) {
    try {
        const user = await db.user.update({
            where: {
                id,
            },
            data: {
                ...values,
            },
        });

        return user;
    } catch {
        return null;
    }
}
