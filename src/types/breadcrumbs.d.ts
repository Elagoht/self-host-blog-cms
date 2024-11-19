type Breadcrumb = {
  href: string
} & ({
  name: keyof Dictionary["breadcrumbs"]
  text?: never
} | {
  name?: never
  text: string
})

interface BreadcrumbsStore {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
}
