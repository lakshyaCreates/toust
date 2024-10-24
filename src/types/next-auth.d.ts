import { type Session } from "@auth/core/types";
import { Plan } from "@prisma/client";

export type ExtendedUser = Session["user"] & {
    plan: Plan;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        plan: Plan;
    }
}
