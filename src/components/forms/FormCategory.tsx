"use client"

import dictionary from "@/i18n"
import { Form, Formik } from "formik"
import { FC } from "react"
import Input from "../formElements/Input"
import Button from "../formElements/Button"
import { patchCategory, postCategory } from "@/services/category"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { categoryAddScheme as categoryScheme } from "@/lib/validation/category"

type FormCategoryProps = {
  mode: "add"
  slug?: never
  initialValues?: never
} | {
  mode: "edit"
  slug: CategoryResponse["slug"]
  initialValues: CategoryFormModel
}

const FormCategory: FC<FormCategoryProps> = ({
  mode, initialValues, slug
}) => {
  const router = useRouter()

  return <Formik<CategoryFormModel>
    initialValues={initialValues || {
      name: "",
      description: "",
      spot: "",
      keywords: ""
    }}
    validationSchema={categoryScheme}
    onSubmit={async (values, { setSubmitting }) => {
      const response = await (mode === "add"
        ? postCategory(values)
        : patchCategory(
          slug,
          Object.fromEntries(Object.entries(initialValues)
            .filter(([key]) => values[
              key as keyof CategoryFormModel
            ] !== initialValues[key as keyof CategoryFormModel]).map(([key]) =>
              [key, values[key as keyof CategoryFormModel]]
            )
          ))
      )


      if (!response.ok) {
        toast.error(mode === "edit"
          ? dictionary.categories.edit.failure
          : dictionary.categories.new.failure
        )
        return setSubmitting(false)
      }

      toast.success(mode === "edit"
        ? dictionary.categories.edit.success
        : dictionary.categories.new.success
      )
      router.push("/categories")
      router.refresh()
    }}
  >
    {({ values, errors, touched, handleChange, isSubmitting }) =>
      <Form className="flex flex-col gap-4">
        <Input
          label={dictionary.categories.new.form.name}
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          touched={touched.name}
        />

        <Input
          label={dictionary.categories.new.form.description}
          name="description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          touched={touched.description}
          minLength={70}
          maxLength={155}
        />

        <Input
          label={dictionary.categories.new.form.spot}
          name="spot"
          value={values.spot}
          onChange={handleChange}
          error={errors.spot}
          touched={touched.spot}
        />

        <Input
          label={dictionary.categories.new.form.keywords}
          message={dictionary.categories.new.form.commaSeparated}
          name="keywords"
          value={values.keywords}
          onChange={handleChange}
          error={errors.keywords}
          touched={touched.keywords}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {dictionary.categories.new.submit}
        </Button>
      </Form>
    }
  </Formik>
}

export default FormCategory