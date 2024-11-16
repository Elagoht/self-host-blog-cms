type PageComponent = {
  params: Promise<Record<string, string?>>
  searchParams: Promise<Record<string, string?>>
}

type ParentComponent = {
  children: ReactNode
}

type RootLayoutComponent = ParentComponent

type LayoutComponent = PageComponent & RootLayoutComponent