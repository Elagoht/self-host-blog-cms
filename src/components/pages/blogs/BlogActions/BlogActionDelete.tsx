"use client"

import Dialog from "@/components/formElements/Dialog"
import dictionary from "@/i18n"
import { deleteBlog } from "@/services/blog"
import Message from "@/utilities/Message"
import { IconTrash } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { FC, useCallback, useState } from "react"
import toast from "react-hot-toast"

type BlogActionDeleteProps = {
  slug: BlogListResponse["slug"]
  title: BlogListResponse["title"]
}

const BlogActionDelete: FC<BlogActionDeleteProps> = ({
  slug, title
}) => {
  const router = useRouter()

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleConfirm = useCallback(async () => {
    const response = await deleteBlog(slug)

    if (response.ok) {
      toast.success(dictionary.blogs.edit.delete.success)
      return router.push("/blogs")
    }

    toast.error(dictionary.blogs.edit.delete.failure)
    setIsDialogOpen(false)
  }, [router, slug])

  const handleCancel = useCallback(() => {
    setIsDialogOpen(false)
  }, [])

  return <>
    <button
      type="button"
      className="p-2 rounded-full text-white
      bg-red-500 dark:bg-red-800 shadow-inner
      shadow-red-800 dark:shadow-red-700"
      onClick={() => setIsDialogOpen(true)}
    >
      <IconTrash />
    </button>

    <Dialog
      isOpen={isDialogOpen}
      message={<span dangerouslySetInnerHTML={{
        __html: Message.format(dictionary.blogs.edit.delete.message, {
          title
        })
      }} />}
      close={() => setIsDialogOpen(false)}
      title={dictionary.blogs.edit.delete.title}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmText={dictionary.blogs.edit.delete.buttons.confirm}
      cancelText={dictionary.blogs.edit.delete.buttons.cancel}
    />
  </>
}

export default BlogActionDelete