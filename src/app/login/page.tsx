import FormLogin from "@/components/forms/FormLogin"
import dictionary from "@/i18n"
import { IconUserScan } from "@tabler/icons-react"
import { FC } from "react"

const LoginPage: FC<PageComponent> = async ({
  searchParams
}) => {
  const { next } = await searchParams

  return <main className="p-4 gap-4 max-w-screen-sm w-full bg-neutral-100
    dark:bg-neutral-900 rounded-xl items-center flex flex-col shadow-lg"
  >
    <IconUserScan size={96} />

    <h1 className="text-3xl font-bold">
      {dictionary.auth.login.title}
    </h1>

    <FormLogin next={next} />
  </main>
}

export default LoginPage