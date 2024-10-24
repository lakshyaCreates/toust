import type { AdapterUser as DefaultAdapterUser } from "@auth/core/adapters";
import { Plan } from "@prisma/client";

declare module "@auth/core/adapters" {
    interface AdapterUser {
        plan: Plan;
    }
}
