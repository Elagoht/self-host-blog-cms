import Content from "@/components/layout/Content"
import { FC } from "react"

const DashboardPage: FC<PageComponent> = () =>
  <Content breadcrumbs={[]}>
    <h1>Dashboard</h1>

    <p>Dashboard content goes here</p>
  </Content>

export default DashboardPage