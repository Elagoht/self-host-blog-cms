import Providers from "@/components/layout/Providers"
import "@/design/globals.css"
import dictionary from "@/i18n"
import classNames from "classnames"
import { Metadata } from "next"
import { DM_Sans as DMSans } from "next/font/google"
import { FC } from "react"

const RootLayout: FC<RootLayoutComponent> = ({
  children
}) =>
  <html lang="en">
    <body className={classNames(
      "bg-neutral-50 text-neutral-900",
      "dark:bg-neutral-950 dark:text-neutral-50",
      dmSans.className
    )}>
      <Providers>
        {children}
      </Providers>
    </body>
  </html>

export const metadata: Metadata = {
  title: {
    default: dictionary.branding.title,
    template: `%s | ${dictionary.branding.title}`
  },
  description: "Manage your blog and create an API to use it in your frontend"
}

const dmSans = DMSans({
  subsets: ["latin"],
  weight: ["400", "600", "500", "700"]
})

export default RootLayout