import dictionary from "@/i18n"
import { FC } from "react"
import BlogCard from "../blogs/BlogCard"
import DashboardContent from "./DashboardContent"

type DashboardMostPupularProps = {
  blogs: BlogCardResponse[]
}

const DashboardMostRecent: FC<DashboardMostPupularProps> = ({
  blogs
}) =>
  <DashboardContent
    title={dictionary.dashboard.recent.title}
    description={dictionary.dashboard.recent.description}
    className="grid grid-cols-1 md:grid-cols-2 gap-2"
  >
    {blogs.map((blog, index) =>
      <BlogCard
        key={index}
        blog={blog}
        layout="grid"
      />
    )}
  </DashboardContent>

export default DashboardMostRecent