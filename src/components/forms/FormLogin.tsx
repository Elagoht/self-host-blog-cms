"use client"

import { Form, Formik } from "formik"
import { FC } from "react"
import Input from "../formElements/Input"
import dictionary from "@/i18n"
import Button from "../formElements/Button"
import { postLogin } from "@/services/auth"
import CookieMonster from "@/utilities/Cookie"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { loginSchema } from "@/lib/validation/login"

type FormLoginProps = {
  next?: string
}

const FormLogin: FC<FormLoginProps> = ({
  next
}) => {
  const router = useRouter()

  return <Formik
    initialValues={{
      username: "",
      passphrase: ""
    }}
    validationSchema={loginSchema}
    onSubmit={async (values, { setSubmitting }) => {
      const response = await postLogin(
        values.username,
        values.passphrase
      )

      if (!response.ok) {
        toast.error(dictionary.auth.login.failure)
        return setSubmitting(false)
      }

      CookieMonster.bake(
        "accessToken",
        (await response.json()).accessToken
      )

      router.push(next || "/")
    }}
  >
    {({ values, touched, errors, handleChange, isSubmitting }) =>
      <Form className="flex flex-col gap-4 w-full">
        <Input
          label={dictionary.auth.login.username}
          name="username"
          value={values.username}
          onChange={handleChange}
          touched={touched.username}
          error={errors.username}
        />

        <Input
          label={dictionary.auth.login.passphrase}
          name="passphrase"
          type="password"
          value={values.passphrase}
          onChange={handleChange}
          touched={touched.passphrase}
          error={errors.passphrase}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {dictionary.auth.login.login}
        </Button>
      </Form>
    }
  </Formik>
}

export default FormLogin