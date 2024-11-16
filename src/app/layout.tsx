import Providers from "@/components/layout/Providers"
import "@/design/globals.css"
import classNames from "classnames"
import { Metadata } from "next"
import { DM_Sans as DMSans } from "next/font/google"
import { FC } from "react"

const RootLayout: FC<RootLayoutComponent> = ({
  children
}) =>
  <html lang="en">
    <body className={classNames(
      "bg-neutral-100 text-neutral-900",
      "dark:bg-neutral-900 dark:text-neutral-100",
      dmSans.className
    )}>
      <Providers>
        {children}
      </Providers>
    </body>
  </html>

export const metadata: Metadata = {
  title: {
    default: "Own Blog CMS",
    template: "%s | Own Blog CMS"
  },
  description: "Manage your blog and create an API to use it in your frontend"
}

const dmSans = DMSans({
  subsets: ["latin"],
  weight: ["400", "600", "500", "700"]
})

export default RootLayout