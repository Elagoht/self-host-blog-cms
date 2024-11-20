"use client"

import dictionary from "@/i18n"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

const NoCategoryWarning = () => {
  const router = useRouter()

  useEffect(() => {
    toast.dismiss()
    toast.error(dictionary.blogs.new.noCategory)
    router.push("/categories/new")
  }, [router])

  return null
}

export default NoCategoryWarning