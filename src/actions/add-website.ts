"use server";

import { z } from "zod";

import db from "@/prisma";
import { AddWebsiteValidator } from "@/validators";

export async function addWebsite(
    values: z.infer<typeof AddWebsiteValidator>,
    userId: string,
) {
    const response = await db.website.create({
        data: {
            ...values,
            userId,
        },
    });

    if (response.id) {
        return {
            success: true,
            message: "Website added!",
        };
    } else {
        return {
            success: false,
            message: "Failed to add website",
        };
    }
}
