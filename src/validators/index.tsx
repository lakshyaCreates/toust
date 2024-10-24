import { z } from "zod";

export const SigninFormValidator = z.object({
    email: z.string().email(),
});
