import { Plan } from "@prisma/client";
import { create } from "zustand";

interface State {
    isOpen: boolean;
    plan: Exclude<Plan, "GUEST">;
}

interface Action {
    open: (data: { plan: Exclude<Plan, "GUEST"> }) => void;
    close: () => void;
}

export const usePurchase = create<State & Action>((set) => ({
    isOpen: false,
    plan: "APPETIZER",
    open: (data) =>
        set((state) => ({
            isOpen: true,
            plan: data.plan,
        })),
    close: () =>
        set((state) => ({
            isOpen: false,
            plan: "APPETIZER",
        })),
}));
