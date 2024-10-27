"use server";

import { z } from "zod";

import db from "@/prisma";
import { ToustValidator } from "@/validators";

export async function updateTousts(data: z.infer<typeof ToustValidator>) {
    console.log(data);

    const tousts = data.tousts;

    try {
        tousts.map(async (toust, index) => {
            const res = await db.toust.update({
                where: {
                    id: toust.id,
                },
                data: {
                    title: toust.title,
                    description: toust.description,
                    index,
                },
            });
        });

        return {
            success: true,
            message: "Updated MF!",
        };
    } catch (error) {
        return {
            success: false,
            message: error as string,
        };
    }
}
