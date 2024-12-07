type PageComponent<Context = object> = {
  params: Promise<Context>
  searchParams: Promise<Record<string, string | undefined>>
}

type ParentComponent<T = object> = {
  children: React.ReactNode
} & T