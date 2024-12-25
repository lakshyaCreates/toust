import { create } from "zustand";

type State = {
    open: boolean;
};

type Action = {
    setOpen: (open: boolean) => void;
};

export const useAddWebsite = create<State & Action>((set) => ({
    open: false,
    setOpen: (state: boolean) => set({ open: state }),
}));
