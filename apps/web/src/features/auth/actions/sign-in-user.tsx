"use server";

import { signIn } from "@/auth";

export async function signInUser() {
    await signIn("google", {
        redirect: true,
        redirectTo: "/",
    });
    return;
}
