import { FC } from "react"

const AuthLayout: FC<LayoutComponent> = ({
  children
}) =>
  <div className="grid place-items-center min-h-screen">
    {children}
  </div>

export default AuthLayout