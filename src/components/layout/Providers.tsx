"use client"

import { FC } from "react"
import { Toaster } from "react-hot-toast"

const Providers: FC<ParentComponent> = ({
  children
}) =>
  <>
    <Toaster
      reverseOrder
      position="bottom-right"
    />

    {children}
  </>

export default Providers