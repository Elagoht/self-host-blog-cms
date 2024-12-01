import { create } from "zustand"

export const useHamburger = create<IHamburgerStore>((set) => ({
  isOpen: false,

  open: () => set({
    isOpen: true
  }),

  close: () => set({
    isOpen: false
  })
}))