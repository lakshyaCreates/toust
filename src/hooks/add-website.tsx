import { Plan } from "@prisma/client";
import { create } from "zustand";

interface State {
    isOpen: boolean;
}

interface Action {
    open: () => void;
    close: () => void;
}

export const useAddWebsite = create<State & Action>((set) => ({
    isOpen: false,
    plan: "APPETIZER",
    open: () =>
        set((state) => ({
            isOpen: true,
        })),
    close: () =>
        set((state) => ({
            isOpen: false,
        })),
}));
