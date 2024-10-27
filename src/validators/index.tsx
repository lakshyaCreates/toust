import { z } from "zod";

export const SigninFormValidator = z.object({
    email: z.string().email(),
});

export const UserOnboardValidator = z.object({
    name: z.string(),
    email: z.string().email(),
});

export const AddWebsiteValidator = z.object({
    url: z.string(),
    toastEvery: z.coerce.number(),
    toastDuration: z.coerce.number(),
    waitFor: z.coerce.number(),
});

export const ToustValidator = z.object({
    tousts: z.array(
        z.object({
            id: z.string().cuid(),
            title: z.string(),
            description: z.string(),
            // time: z.string(),
            // imageUrl: z.string().url(),
        }),
    ),
});
