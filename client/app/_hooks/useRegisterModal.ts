import { create } from "zustand";

interface RegisterModelStore {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const RegisterModel = create<RegisterModelStore>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));

export default RegisterModel;
