"use client"

import dictionary from "@/i18n"
import { Form, Formik } from "formik"
import { FC } from "react"
import Input from "../formElements/Input"
import Button from "../formElements/Button"

const FormCategoryAdd: FC = () => {
  return <Formik
    initialValues={{
      name: "",
      description: "",
      spot: "",
      keywords: ""
    } as CategoryModel}
    onSubmit={() => { }}
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

export default FormCategoryAdd