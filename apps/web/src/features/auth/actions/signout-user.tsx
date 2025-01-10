"use server";

import { signOut } from "@/auth";

export async function signoutUser() {
    await signOut({
        redirect: true,
        redirectTo: "/",
    });
}
