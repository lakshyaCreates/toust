import { z } from "zod";

export const SigninFormValidator = z.object({
    email: z.string().email(),
});

export const UserOnboardValidator = z.object({
    name: z.string(),
    email: z.string().email(),
});
