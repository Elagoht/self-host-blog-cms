"use client"

import Button from "@/components/formElements/Button"
import FileInput from "@/components/formElements/FileInput"
import Input from "@/components/formElements/Input"
import Select from "@/components/formElements/Select"
import TextArea from "@/components/formElements/TextArea"
import BlogPreview from "@/components/pages/blogs/BlogPreview"
import dictionary from "@/i18n"
import { postBlog } from "@/services/blog"
import {
  IconDeviceFloppy, IconEyeOff, IconLayoutBottombarFilled,
  IconLayoutSidebarRightFilled, IconLoader
} from "@tabler/icons-react"
import classNames from "classnames"
import { Form, Formik } from "formik"
import { FC, useState } from "react"
import toast from "react-hot-toast"

type FormBlogAddProps = {
  categories: Category[]
}

const FormBlogAdd: FC<FormBlogAddProps> = ({
  categories
}) => {
  const [preview, setPreview] = useState<
    "horizontal" | "vertical" | "disabled"
  >("vertical")

  return <Formik
    initialValues={{
      title: "",
      slug: "",
      content: "",
      cover: null,
      keywords: "",
      description: "",
      spot: "",
      category: ""
    } as BlogModel}
    onSubmit={(values, { setSubmitting }) => postBlog({
      ...values,
      cover: values.cover as File
    }).then(() => toast.success(
      dictionary.blogs.new.success
    )).catch(() => toast.error(
      dictionary.blogs.new.failure
    )).finally(() =>
      setSubmitting(false)
    )}
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
                error={String(errors.cover)}
                touched={Boolean(touched.cover)}
                onChange={(event) => setValues({
                  ...values,
                  cover: event.target.files?.[0] || null
                })}
              />

              <TextArea
                label={dictionary.blogs.new.form.content}
                name="content"
                value={values.content}
                error={errors.content}
                touched={touched.content}
                onChange={handleChange}
                className="font-mono min-h-64"
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

export default FormBlogAdd