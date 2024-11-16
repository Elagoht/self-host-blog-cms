"use client"

import { FC } from "react"
import { Toaster } from "react-hot-toast"

const Providers: FC<ParentComponent> = ({
  children
}) =>
  <>
    <Toaster />

    {children}
  </>

export default Providers