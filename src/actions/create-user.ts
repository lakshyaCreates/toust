"use server";

import { OrderStatus, Plan, User } from "@prisma/client";

import db from "@/prisma";

interface Data {
    name: string;
    email: string;
    plan: Plan;
    orderId?: string;
    orderStatus?: OrderStatus;
    paymentId?: string;
}

export async function createUser(data: Data) {
    const res = await db.user.create({
        data: {
            ...data,
        },
    });

    return res;
}
