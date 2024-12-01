"use client"

import Button from "@/components/formElements/Button"
import Checkbox from "@/components/formElements/Checkbox"
import Input from "@/components/formElements/Input"
import Select from "@/components/formElements/Select"
import Expandable from "@/components/ui/Expandable"
import dictionary from "@/i18n"
import classNames from "classnames"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import QueryString from "qs"
import { FC } from "react"

type BlogFilterOptionsProps = {
  expandedFilters: boolean
  searchParams: Record<string, string | undefined>
  categories: CategoryResponse[]
}

const BlogFilterOptions: FC<BlogFilterOptionsProps> = ({
  expandedFilters, searchParams, categories
}) => {
  const router = useRouter()

  return <Expandable
    expanded={expandedFilters}
    className={classNames({
      "p-2 -m-2 gap-2 grid": expandedFilters
    })}
  >
    <Formik<BlogFilters>
      initialValues={{
        category: searchParams.category ?? "",
        published: ["true", "false"].includes(
          searchParams.published ?? ""
        ) ? searchParams.published as "true" | "false"
          : "",
        search: searchParams.query ?? ""
      }}
      onSubmit={(values) =>
        router.push(`/blogs${QueryString.stringify(
          Object.fromEntries(Object.entries(
            values
          ).filter(([, value]) =>
            value !== ""
          )), {
          arrayFormat: "comma",
          skipNulls: true,
          addQueryPrefix: true
        })}`)
      }
    >
      {({ values, handleChange }) =>
        <Form className="grid gap-2">
          <div className="grid gap-4 grid-cols-4">
            <Select
              label={dictionary.blogs.main.filters.status}
              name="published"
              value={values.published}
              onChange={handleChange}
            >
              {[
                { name: dictionary.blogs.main.filters.all, value: "" },
                { name: dictionary.blogs.main.filters.published, value: "true" },
                { name: dictionary.blogs.main.filters.draft, value: "false" }
              ].map(option =>
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.name}
                </option>
              )}
            </Select>

            <Input
              label={dictionary.blogs.main.filters.search.title}
              placeholder={dictionary.blogs.main.filters.search.placeholder}
              name="search"
              value={values.search}
              containerClassName="col-span-3"
              onChange={handleChange}
            />
          </div>

          <span className="text-sm font-semibold">
            {dictionary.blogs.main.filters.category}
          </span>

          <div className="flex flex-wrap gap-4">
            {categories.map(category =>
              <label
                key={category.slug}
                className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-md"
              >
                <Checkbox
                  label={category.name}
                  name="category"
                  value={category.slug}
                  checked={values.category.includes(category.slug)}
                  onChange={handleChange}
                />
              </label>
            )}
          </div>

          <Button
            type="submit"
            color="primary"
          >
            {dictionary.blogs.main.filters.apply}
          </Button>
        </Form>
      }
    </Formik>
  </Expandable>
}

export default BlogFilterOptions

type BlogFilters = {
  category: CategoryResponse["name"]
  published: "true" | "false" | ""
  search: string
}