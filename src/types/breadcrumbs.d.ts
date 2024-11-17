type Breadcrumb = {
  href: string
  name: keyof Dictionary["breadcrumbs"]
}

interface BreadcrumbsStore {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
}
