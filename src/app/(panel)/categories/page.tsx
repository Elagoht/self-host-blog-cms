import Button from "@/components/formElements/Button"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { getCategories } from "@/services/category"
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"
import classNames from "classnames"
import Link from "next/link"
import { FC } from "react"

const CategoriesPage: FC<PageComponent> = async () => {
  const categories = await (await getCategories()).json()

  return <Content breadcrumbs={[
    { name: "categories", href: "/blogs" }
  ]}>
    <Container
      title={dictionary.categories.main.title}
      description="List of categories"
    >
      <table className="w-full overflow-clip rounded-lg
        border-neutral-300 dark:border-neutral-700
        shadow dark:shadow-neutral-950"
      >
        <thead>
          <tr className="bg-neutral-950 text-neutral-100
            divide-x divide-neutral-900"
          >
            {[
              dictionary.categories.main.table.name,
              dictionary.categories.main.table.spot,
              dictionary.categories.main.table.keywords,
              dictionary.categories.main.table.edit,
              dictionary.categories.main.table.delete
            ].map((column) =>
              <th
                key={column}
                className="py-2 px-4"
              >
                {column}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {categories.map((category: CategoryResponse) =>
            <tr
              key={category.id}
              className="odd:bg-neutral-200 dark:odd:bg-neutral-800
              divide-x divide-neutral-300 dark:divide-neutral-950"
            >
              {[
                category.name,
                category.spot,
                category.keywords,
                <Link
                  key="edit"
                  href={`/categories/edit/${category.slug}`}
                  className="absolute inset-0 grid place-items-center
                  hover:bg-secondary-500 hover:text-neutral-900
                  transition-all"
                >
                  <IconEdit />
                </Link>,
                <Link
                  key="delete"
                  className="absolute inset-0 grid place-items-center
                  hover:bg-red-500 hover:text-neutral-100
                  transition-all"
                  href={`/categories/delete/${category.slug}`}
                >
                  <IconTrash />
                </Link>
              ].map((cell, index) =>
                <td
                  key={index}
                  className={classNames({
                    "px-4 py-2": typeof cell === "string",
                    "relative": typeof cell !== "string"
                  })}
                >
                  {cell}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>

      <Button
        href={"/categories/new"}
        className="text-right w-fit ml-auto"
        color="success"
        icon={<IconPlus />}
      >
        {dictionary.categories.main.new}
      </Button>
    </Container>
  </Content>
}

export default CategoriesPage