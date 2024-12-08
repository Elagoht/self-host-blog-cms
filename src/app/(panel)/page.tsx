import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import DashboardCategories from "@/components/pages/dashboard/DashboardCategories"
import DashboardMostPupular from "@/components/pages/dashboard/DashboardMostPopular"
import DashboardMostRecent from "@/components/pages/dashboard/DashboardMostRecent"
import dictionary from "@/i18n"
import { getBlogs } from "@/services/blog"
import { getCategories } from "@/services/category"
import { FC } from "react"

export const dynamic = "force-dynamic"

const DashboardPage: FC<PageComponent> = async () => {
  const categories = await (await getCategories()).json()
  const { data: popular } = await (await getBlogs({
    sort: "popular",
    take: 6
  })).json()
  const { data: recent } = await (await getBlogs({
    sort: "recent",
    take: 6
  })).json()

  return <Content breadcrumbs={[]} >
    <Container
      title={dictionary.dashboard.title}
      description={dictionary.dashboard.description}
    >
      <DashboardCategories categories={categories} />

      <div className="grid 2xl:grid-cols-2 gap-4">
        <DashboardMostPupular blogs={popular} />

        <DashboardMostRecent blogs={recent} />
      </div>
    </Container>
  </Content>
}

export default DashboardPage