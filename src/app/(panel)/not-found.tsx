import Button from "@/components/formElements/Button"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { IconArrowLeft, IconEyeClosed } from "@tabler/icons-react"
import { FC } from "react"

const PanelNotFoundPage: FC = () => {
  return <Content breadcrumbs={[{
    text: "???", href: "/"
  }]}>
    <div className="flex items-center justify-center
      flex-col min-h-full"
    >
      <IconEyeClosed size={64} />

      <h1 className="text-7xl font-bold
        text-neutral-900 dark:text-neutral-100"
      >
        {dictionary.panel.notFound.title}

      </h1>

      <p className="text-xl font-semibold
        text-neutral-600 dark:text-neutral-400"
      >
        {dictionary.panel.notFound.message}
      </p>

      <Button
        href="/"
        className="mt-4"
        color="secondary"
        icon={<IconArrowLeft />}
        reverse
      >
        {dictionary.panel.notFound.back}
      </Button>
    </div>
  </Content>
}

export default PanelNotFoundPage