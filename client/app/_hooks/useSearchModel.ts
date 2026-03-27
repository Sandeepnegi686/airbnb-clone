import { create } from "zustand";

interface SearchModelStore {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const SearchModel = create<SearchModelStore>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));

export default SearchModel;
