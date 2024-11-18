"use client"

import Button from "@/components/formElements/Button"
import FileInput from "@/components/formElements/FileInput"
import Input from "@/components/formElements/Input"
import Select from "@/components/formElements/Select"
import TextArea from "@/components/formElements/TextArea"
import BlogPreview from "@/components/pages/blogs/BlogPreview"
import dictionary from "@/i18n"
import { patchBlog, postBlog } from "@/services/blog"
import {
  IconDeviceFloppy, IconEyeOff, IconLayoutBottombarFilled,
  IconLayoutSidebarRightFilled, IconLoader
} from "@tabler/icons-react"
import classNames from "classnames"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import toast from "react-hot-toast"
import Switch from "../formElements/Switch"
import { blogAddScheme } from "@/lib/validation/blogs"

type FormBlogProps = {
  categories: CategoryResponse[]
} & ({
  mode: "add"
  slug?: never
  initialValues?: never
} | {
  mode: "edit"
  slug: CategoryResponse["slug"]
  initialValues: BlogResponse
})

const FormBlog: FC<FormBlogProps> = ({
  categories, mode, slug, initialValues
}) => {
  const router = useRouter()

  const [preview, setPreview] = useState<
    "horizontal" | "vertical" | "disabled"
  >("vertical")

  return <Formik<BlogFormModel>
    initialValues={initialValues || {
      title: "",
      content: "",
      cover: null,
      keywords: "",
      description: "",
      spot: "",
      category: -1,
      published: false
    }}
    validationSchema={blogAddScheme}
    onSubmit={async (values, { setSubmitting }) => {
      const response = await (mode === "add"
        ? postBlog(values as BlogRequest)
        : patchBlog(
          slug,
          Object.fromEntries(Object.entries(
            initialValues
          ).filter(([key]) => values[
            key as keyof BlogFormModel
          ] !== initialValues[key as keyof BlogFormModel]).map(([key]) =>
            [key, values[key as keyof BlogFormModel]]
          ))
        )
      )

      if (!response.ok) {
        try {
          const { message } = await response.json() as { message: string }
          toast.error(message)
        } catch {
          toast.error(mode === "edit"
            ? dictionary.blogs.edit.failure
            : dictionary.blogs.new.failure
          )
        }
        return setSubmitting(false)
      }

      toast.success(mode === "edit"
        ? dictionary.blogs.edit.success
        : dictionary.blogs.new.success
      )

      router.push("/blogs")
    }}
  >
    {({ values, errors, touched, handleChange, setValues, isSubmitting }) =>
      <Form>
        <div className="flex gap-4 items-start max-md:flex-col">
          <div className="flex gap-4 items-center flex-col sticky top-0">
            <button
              type="button"
              className="shadow-md p-2 rounded-full
              bg-neutral-200 dark:bg-neutral-800"
              onClick={() => setPreview(
                preview === "horizontal"
                  ? "vertical"
                  : preview === "vertical"
                    ? "disabled"
                    : "horizontal"
              )}
            >
              {preview === "horizontal"
                ? <IconLayoutBottombarFilled />
                : preview === "vertical"
                  ? <IconLayoutSidebarRightFilled />
                  : <IconEyeOff />
              }
            </button>
          </div>

          <div className={classNames(
            "flex gap-4 w-full", {
            "flex-col max-w-screen-lg mx-auto": preview !== "vertical"
          })}>
            <section className="flex flex-col gap-4 w-full">
              <Input
                label={dictionary.blogs.new.form.title}
                name="title"
                value={values.title}
                error={errors.title}
                touched={touched.title}
                onChange={handleChange}
              />

              <FileInput
                label={dictionary.blogs.new.form.cover}
                name="cover"
                accept=".jpg,.jpeg,.png,.webp"
                error={errors.cover}
                touched={Boolean(touched.cover)}
                onChange={(event) => setValues({
                  ...values,
                  cover: event.target.files?.[0] || null
                })}
              />

              <TextArea
                label={dictionary.blogs.new.form.content}
                message={dictionary.blogs.new.form.markdown}
                name="content"
                value={values.content}
                error={errors.content}
                touched={touched.content}
                onChange={handleChange}
                className="font-mono min-h-64"
              />

              <Input
                label={dictionary.blogs.new.form.keywords}
                message={dictionary.blogs.new.form.commaSeparated}
                name="keywords"
                value={values.keywords}
                error={errors.keywords}
                touched={touched.keywords}
                onChange={handleChange}
              />

              <Input
                label={dictionary.blogs.new.form.description}
                message={dictionary.blogs.new.form.plainText}
                name="description"
                value={values.description}
                error={errors.description}
                touched={touched.description}
                onChange={handleChange}
                minLength={75}
                maxLength={155}
              />

              <Input
                label={dictionary.blogs.new.form.spot}
                message={dictionary.blogs.new.form.markdown}
                name="spot"
                value={values.spot}
                error={errors.spot}
                touched={touched.spot}
                onChange={handleChange}
                maxLength={75}
              />

              <Select
                label={dictionary.blogs.new.form.category}
                name="category"
                value={values.category}
                error={errors.category}
                touched={touched.category}
                onChange={handleChange}
              >
                {categories.map((category) =>
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )}
              </Select>

              <Switch
                label={dictionary.blogs.new.form.published}
                name="published"
                checked={values.published}
                onChange={handleChange}
                error={errors.published}
                touched={touched.published}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                icon={isSubmitting
                  ? <IconLoader className="animate-spin" />
                  : <IconDeviceFloppy />
                }
              >
                {dictionary.blogs.new.submit}
              </Button>
            </section>

            {preview !== "disabled" &&
              <section className="flex flex-col gap-4 w-full">
                <BlogPreview
                  dictionary={dictionary}
                  preview={{
                    title: values.title,
                    content: values.content,
                    cover: values.cover
                  }}
                />
              </section>
            }
          </div>
        </div>
      </Form>
    }
  </Formik>
}

export default FormBlog