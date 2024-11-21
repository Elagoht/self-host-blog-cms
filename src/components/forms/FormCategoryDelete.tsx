"use client"

import { Form, Formik } from "formik"
import { FC } from "react"
import Button from "../formElements/Button"
import CategoryDeleteTable from "../pages/categories/CategoryDeleteContent/CategoryDeleteTable"
import dictionary from "@/i18n"
import Message from "@/utilities/Message"

type FormCategoryDeleteProps = {
  blogs: BlogResponse[]
  category: CategoryResponse
  categories: CategoryResponse[]
}

const FormCategoryDelete: FC<FormCategoryDeleteProps> = ({
  blogs, category, categories
}) => {
  return <Formik<FormikType>
    initialValues={{
      // "" represents the blogs to be deleted
      "": blogs.map(({ slug }) => slug),
      ...Object.fromEntries(
        categories.filter((current) =>
          current.slug !== category.slug
        ).map(({ slug }) => [slug, []])
      )
    }}
    onSubmit={() => { }}
  >
    {({ values, setValues }) => {
      const handleTransfer = (
        source: CategoryResponse["slug"],
        target: CategoryResponse["slug"],
        slugs: BlogResponse["slug"][]
      ) => setValues({
        ...values,
        [source]: values[source].filter((slug) =>
          !slugs.includes(slug)
        ),
        [target]: Array.from(new Set([
          ...values[target],
          ...slugs
        ]))
      })

      return <Form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <CategoryDeleteTable
            categories={categories.filter(({ slug }) =>
              slug !== category.slug
            )}
            name={dictionary.categories.delete.table.delete}
            slug=""
            blogs={blogs}
            list={values[""]}
            handleTransfer={handleTransfer}
          />

          {categories.filter((current) =>
            current.slug !== category.slug
          ).map((current) =>
            <CategoryDeleteTable
              key={current.slug}
              categories={categories.filter(({ slug }) =>
                ![current.slug, category.slug].includes(slug)
              )}
              name={Message.format(
                dictionary.categories.delete.table.newCategory, {
                name: current.name
              })}
              slug={current.slug}
              list={values[current.slug]}
              blogs={blogs.filter((blog) =>
                values[current.slug].includes(blog.slug)
              )}
              handleTransfer={handleTransfer}
            />
          )}
        </div>

        <Button
          type="submit"
          color="danger"
          className="mt-4 ml-auto"
        >
          {dictionary.categories.delete.submit}
        </Button>
      </Form>
    }}
  </Formik >
}

export default FormCategoryDelete

type FormikType = Record<CategoryResponse["slug"], BlogResponse["slug"][]>