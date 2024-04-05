import { create } from "zustand";

interface CreateModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateModal = create<CreateModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
