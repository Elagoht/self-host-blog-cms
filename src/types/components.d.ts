type PageComponent<Context> = {
  params: Promise<Context>
  searchParams: Promise<Record<string, string | undefined>>
}

type ParentComponent<T = object> = {
  children: ReactNode
} & T

type RootLayoutComponent = ParentComponent

type LayoutComponent = PageComponent & RootLayoutComponent