import Content from "@/components/layout/Content"
import { IconLoader } from "@tabler/icons-react"
import { FC } from "react"

const PanelLoading: FC = () =>
  <Content breadcrumbs={[]}>
    <div className="min-h-screen flex flex-col
      items-center justify-center animate-fade-in"
    >
      <IconLoader
        size={128}
        stroke={1.5}
        className="animate-spin"
      />
    </div>
  </Content>

export default PanelLoading