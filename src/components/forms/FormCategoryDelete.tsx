"use client"

import dictionary from "@/i18n"
import { deleteCategory } from "@/services/category"
import { Form, Formik } from "formik"
import { FC } from "react"
import toast from "react-hot-toast"
import Button from "../formElements/Button"
import CategoryDeleteTable from "../pages/categories/CategoryDeleteContent/CategoryDeleteTable"
import CategoryDeleteNoAlternatives from "../pages/categories/CategoryDeleteContent/CategoryDeleteNoAlternatives"
import { useRouter } from "next/navigation"

type FormCategoryDeleteProps = {
  blogs: BlogListResponse[]
  category: CategoryResponse
  categories: CategoryResponse[]
}

const FormCategoryDelete: FC<FormCategoryDeleteProps> = ({
  blogs, category, categories
}) => {
  const router = useRouter()

  return <Formik<CategoryDeleteModel>
    initialValues={{
      [category.slug]: blogs.map(({ slug }) => slug),
      ...Object.fromEntries(
        categories.filter((current) =>
          current.slug !== category.slug
        ).map(({ slug }) => [slug, []])
      )
    }}
    onSubmit={async (values, { setSubmitting }) => {
      const response = await deleteCategory(
        category.slug, values
      )

      if (!response.ok) {
        try {
          const { message } = await response.json() as { message: string }
          toast.error(message)
        } catch {
          toast.error(dictionary.categories.delete.failure)
        } finally {
          setSubmitting(false)
        }
      }

      toast.success(dictionary.categories.delete.success)
      router.push("/categories")
    }}
  >
    {({ values, setValues }) => {
      const handleTransfer = (
        source: CategoryResponse["slug"],
        target: CategoryResponse["slug"],
        slugs: BlogListResponse["slug"][]
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
        {blogs.length > 0 &&
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {categories.sort((a) =>
              a.slug === category.slug ? -1 : 1
            ).map((current) =>
              <CategoryDeleteTable
                key={current.slug}
                categories={categories.filter(({ slug }) =>
                  ![current.slug, category.slug].includes(slug)
                )}
                name={current.name}
                slug={current.slug}
                list={values[current.slug]}
                blogs={blogs.filter((blog) =>
                  values[current.slug].includes(blog.slug)
                )}
                handleTransfer={handleTransfer}
                deleting={category.slug}
                isTrash={current.slug === category.slug}
              />
            )}

            {categories.length === 1 &&
              <CategoryDeleteNoAlternatives slug={category.slug} />
            }
          </div>
        }

        <Button
          type="submit"
          color="danger"
          className="mt-4 ml-auto"
        >
          {dictionary.categories.delete.submit}
        </Button>
      </Form>
    }}
  </Formik>
}

export default FormCategoryDelete