import { create } from "zustand";

interface RentModalStore {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const RentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));

export default RentModal;
