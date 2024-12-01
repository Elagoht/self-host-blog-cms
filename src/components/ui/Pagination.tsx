import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import classNames from "classnames"
import Link from "next/link"
import QueryString from "qs"
import { FC, createElement } from "react"

type PaginationProps = {
  pathname: string
  totalPages: number
  searchParams: Record<string, string | undefined>
  pageParam: string
  seek?: number
  seekDirection?: "both" | "forward" | "backward"
}

const Pagination: FC<PaginationProps> = ({
  pathname,
  totalPages,
  searchParams,
  pageParam = "page",
  seek = 2,
  seekDirection = "both"
}) => {
  const currentPage = Number(searchParams[pageParam]) || 1

  const createPageUrl = (page: number) =>
    `${pathname}${QueryString.stringify({
      ...searchParams,
      [pageParam]: page
    }, {
      addQueryPrefix: true
    })}`

  const pageNumbers = (() => {
    const pages = []

    if (["both", "backward"].includes(seekDirection)) pages.push(
      ...Array.from({
        length: currentPage - Math.max(1, currentPage - seek)
      }, (_, i) => currentPage - i - 1).reverse()
    )

    pages.push(currentPage)

    if (["both", "forward"].includes(seekDirection)) pages.push(
      ...Array.from({
        length: Math.min(totalPages, currentPage + seek) - currentPage
      }, (_, i) => currentPage + i + 1)
    )

    return pages
  })()

  return <div className="flex items-center justify-center space-x-2 mt-4">
    {createElement(
      currentPage > 1 ? Link : "div", {
      href: createPageUrl(currentPage - 1),
      className: classNames(
        "h-10 w-10 grid place-items-center text-sm bg-gray-200",
        "rounded hover:bg-gray-300 dark:bg-neutral-700",
        "dark:hover:bg-neutral-600 shadow", {
        "opacity-30 cursor-not-allowed": currentPage === 1
      })
    }, <IconArrowLeft />)}


    {pageNumbers.map((page) =>
      createElement(
        page === currentPage ? "div" : Link, {
        key: page,
        href: createPageUrl(page),
        className: classNames(
          "h-10 w-10 grid place-items-center text-sm",
          "rounded select-none shadow", {
          "text-primary-100 bg-primary-500": page === currentPage,
          "bg-neutral-200 hover:bg-neutral-300": page !== currentPage,
          "dark:bg-neutral-700 dark:hover:bg-neutral-600": page !== currentPage
        })
      }, page)
    )}

    {createElement(
      currentPage < totalPages ? Link : "div", {
      href: createPageUrl(currentPage + 1),
      className: classNames(
        "h-10 w-10 grid place-items-center text-sm bg-gray-200",
        "rounded hover:bg-gray-300 dark:bg-neutral-700",
        "dark:hover:bg-neutral-600 shadow", {
        "opacity-30 cursor-not-allowed": currentPage === totalPages
      })
    }, <IconArrowRight />)}
  </div>
}

export default Pagination
