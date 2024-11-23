import dictionary from "@/i18n"
import TypeWriter from "@/utilities/TypeWriter"
import { IconCheck, IconClock, IconEdit } from "@tabler/icons-react"
import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

type BlogCardProps = {
  blog: BlogResponse
  layout?: "grid" | "list"
}

const BlogCard: FC<BlogCardProps> = ({
  blog, layout = "grid"
}) =>
  <Link
    href={`/blogs/edit/${blog.slug}`}
    className={classNames(
      "p-2 bg-neutral-50 dark:bg-neutral-800",
      "flex rounded-lg shadow transition-colors",
      "hover:ring-2 hover:ring-offset-2 ring-secondary-500",
      "ring-offset-neutral-50 dark:ring-offset-neutral-900", {
      "flex-col gap-1": layout === "grid",
      "gap-2 max-lg:flex-col": layout === "list"
    })}
  >
    <div className="relative">
      <Image
        src={blog.cover}
        alt={blog.title}
        width={512}
        height={288}
        className={classNames(
          "rounded-lg bg-neutral-200 dark:bg-neutral-700 aspect-video", {
          "w-full": layout === "grid",
          "max-lg:w-full lg:max-w-64": layout === "list"
        })}
      />

      <span className={classNames(
        "absolute top-2 left-2 p-1 rounded-md flex items-center gap-1 pr-2",
        "line-clamp-1 text-white bg-opacity-80 dark:bg-opacity-80", {
        "bg-green-500": blog.published,
        "bg-yellow-500": !blog.published
      })}>
        {blog.published
          ? <IconCheck />
          : <IconEdit />
        }
        {dictionary.blogs.card.status[blog.published
          ? "published"
          : "draft"
        ]}
      </span>

      <span className={classNames(
        "absolute bottom-2 right-2 p-1 rounded-md text-sm",
        "bg-primary-500 bg-opacity-80 text-white line-clamp-1"
      )}>
        {blog.category.name}
      </span>
    </div>

    <div className={classNames(
      "grow flex flex-col", {
      "gap-1": layout === "grid"
    })}>
      <h2 className={classNames(
        "text-lg font-medium line-clamp-2 leading-tight", {
        "mt-2": layout === "grid"
      })}>
        {blog.title}
      </h2>

      <div
        className={classNames(
          "text-neutral-500 dark:text-neutral-400",
          "line-clamp-3 grow my-2", {
          "text-sm": layout === "grid"
        })}
        dangerouslySetInnerHTML={{
          __html: TypeWriter.markdownToHtml(blog.spot)
        }}
      />

      <div className={classNames(
        "flex gap-2", {
        "justify-between": layout === "grid"
      })}>
        {[
          { icon: IconClock, date: blog.createdAt },
          { icon: IconEdit, date: blog.updatedAt }
        ].map(({ icon: Icon, date }, index) => (
          <div
            key={index}
            className="text-neutral-500 dark:text-neutral-400
            text-sm flex items-center gap-1"
          >
            <Icon size={16} />
            {new Date(date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </div>
        ))}
      </div>
    </div>
  </Link>

export default BlogCard