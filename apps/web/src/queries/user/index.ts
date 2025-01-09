import db from "@workspace/db";

export async function getUserById(id: string) {
    "use server";

    return await db.user.findUnique({
        where: {
            id,
        },
    });
}
