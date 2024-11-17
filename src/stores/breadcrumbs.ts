import { create } from "zustand"

const useBreadcrumbs = create<BreadcrumbsStore>((set) => ({
  breadcrumbs: [],

  setBreadcrumbs: (breadcrumbs) => set({
    breadcrumbs
  })
}))

export default useBreadcrumbs