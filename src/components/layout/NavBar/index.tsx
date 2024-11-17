import { FC } from "react"
import navbarMenu from "./navbarMenu"
import NavBarItem from "./NavBarItem"

const NavBar: FC = () => {
  return <nav
    className="flex flex-col gap-1"
  >
    {navbarMenu.map((item, index) =>
      <NavBarItem
        key={index}
        {...item}
      />
    )}
  </nav>
}

export default NavBar