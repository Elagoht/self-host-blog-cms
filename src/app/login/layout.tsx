import { FC } from "react"

const AuthLayout: FC<ParentComponent> = ({
  children
}) =>
  <div className="grid place-items-center min-h-screen">
    {children}
  </div>

export default AuthLayout