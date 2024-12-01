"use client"

import Button from "@/components/formElements/Button"
import Checkbox from "@/components/formElements/Checkbox"
import Input from "@/components/formElements/Input"
import Select from "@/components/formElements/Select"
import dictionary from "@/i18n"
import { IconFilterCheck, IconFilterOff } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import QueryString from "qs"
import { FC } from "react"

type BlogFilterOptionsProps = {
  searchParams: Record<string, string | undefined>
  categories: CategoryResponse[]
}

const BlogFilterOptions: FC<BlogFilterOptionsProps> = ({
  searchParams, categories
}) => {
  const router = useRouter()

  return <Formik<BlogFilters>
    initialValues={{
      sort: [
        "newest", "oldest", "popular",
        "unpopular", "a-z", "z-a"
      ].includes(
        searchParams.sort ?? ""
      ) ? searchParams.sort as BlogSort
        : "newest",
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
    {({ values, setValues, handleChange }) =>
      <Form className="grid gap-2">
        <div className="flex gap-4 max-md:flex-wrap">
          <Select
            label={dictionary.blogs.main.filters.status}
            name="published"
            value={values.published}
            onChange={handleChange}
            containerClassName="shrink-0"
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

          <Select
            label={dictionary.blogs.main.filters.sort}
            name="sort"
            value={values.sort}
            onChange={handleChange}
            containerClassName="shrink-0 max-md:grow"
          >
            {[
              { name: dictionary.blogs.main.filters.newest, value: "newest" },
              { name: dictionary.blogs.main.filters.oldest, value: "oldest" },
              { name: dictionary.blogs.main.filters.popular, value: "popular" },
              { name: dictionary.blogs.main.filters.unpopular, value: "unpopular" },
              { name: dictionary.blogs.main.filters.a2z, value: "a-z" },
              { name: dictionary.blogs.main.filters.z2a, value: "z-a" }
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
            containerClassName="grow"
            className="min-w-none w-full"
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

        <div className="flex gap-4 mt-4">
          <Button
            type="submit"
            color="primary"
            icon={<IconFilterCheck />}
          >
            {dictionary.blogs.main.filters.apply}
          </Button>

          <Button
            type="reset"
            onClick={() => {
              setValues({
                sort: "",
                category: "",
                published: "",
                search: ""
              })
              router.push("/blogs")
            }}
            color="danger"
            icon={<IconFilterOff />}
          >
            {dictionary.blogs.main.filters.reset}
          </Button>
        </div>
      </Form>
    }
  </Formik>
}

export default BlogFilterOptions

type BlogFilters = {
  sort: BlogSort | ""
  category: CategoryResponse["name"]
  published: "true" | "false" | ""
  search: string
}