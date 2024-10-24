"use server";

import { z } from "zod";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/prisma/queries/get/user";
import { SigninFormValidator } from "@/validators";

export async function signin(values: z.infer<typeof SigninFormValidator>) {
    try {
        if (!values.email) {
            return { status: 400, message: "Email is required" };
        }

        const email = values.email;

        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            return { status: 500, message: "User not found" };
        }

        if (existingUser.plan === "GUEST") {
            return {
                status: 500,
                message: "This email account has not purchased Toust!",
            };
        }

        if (existingUser && existingUser.email) {
            try {
                await signIn("resend", {
                    email,
                    redirect: false,
                });

                return {
                    status: 200,
                    message: "Sign in link sent to your email",
                };
            } catch (error) {
                console.error(error);

                return { status: 500, message: "Error sending email!" };
            }
        }
    } catch (error) {
        return { status: 500, message: "Internal Server Error" };
    }

    return {
        status: 200,
        message: "Sign in link sent to your email",
    };
}
