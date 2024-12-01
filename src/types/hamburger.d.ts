interface IHamburgerStore {
  isOpen: boolean
  open: () => void
  close: () => void
}