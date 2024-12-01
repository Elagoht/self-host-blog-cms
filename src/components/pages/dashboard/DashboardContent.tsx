import { FC } from "react"

type DashboardContentProps = ParentComponent<{
  title: string
  description?: string
  className?: string
}>

const DashboardContent: FC<DashboardContentProps> = ({
  title, description, className, children
}) =>
  <section className="flex flex-col gap-2 p-2 rounded-xl shadow-inner
  bg-neutral-200 dark:bg-neutral-950"
  >
    <hgroup className="flex flex-col gap-2 p-4 py-2 rounded-lg
      shadow bg-neutral-100 dark:bg-neutral-800"
    >
      <h1 className="text-2xl font-bold text-secondary-500">
        {title}
      </h1>

      {description &&
        <p className="text-neutral-500">{description}</p>
      }
    </hgroup>

    <div className={className}>
      {children}
    </div>
  </section>

export default DashboardContent