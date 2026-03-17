import { create } from "zustand";

interface LoginModelStore {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const LoginModel = create<LoginModelStore>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));

export default LoginModel;
