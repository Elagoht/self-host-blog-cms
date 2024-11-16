import { FC } from "react"

const Container: FC<ParentComponent> = ({
  children
}) =>
  <section className="flex max-w-screen-lg">
    {children}
  </section>


export default Container