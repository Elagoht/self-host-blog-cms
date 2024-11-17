import { FC } from "react"
import headerMenu from "./headerMenu"
import HeaderMenuItem from "./HeaderMenuItem"

const HeaderMenu: FC = () => {
  return <nav className="flex gap-1 items-center">
    {headerMenu.map((item, index) =>
      <HeaderMenuItem
        key={index}
        {...item}
      />
    )}
  </nav>
}

export default HeaderMenu