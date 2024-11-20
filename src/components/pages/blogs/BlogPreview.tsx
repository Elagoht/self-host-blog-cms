import dictionary from "@/i18n"
import TypeWriter from "@/utilities/TypeWriter"
import { IconImageInPicture } from "@tabler/icons-react"
import Image from "next/image"
import { FC } from "react"

interface IBlogPreviewProps {
  dictionary: Dictionary
  preview: {
    title: BlogFormModel["title"]
    cover: BlogFormModel["cover"]
    content: BlogFormModel["content"]
  }
}

const BlogPreview: FC<IBlogPreviewProps> = ({ preview }) => {
  return <article className="prose prose-neutral dark:prose-invert w-full">
    <span className="text-2xl text-neutral-500 font-bold">
      {dictionary.blogs.preview.title}
    </span>

    <hr />

    <h1 className="line-clamp-2">
      {preview.title || dictionary.blogs.preview.placeholder.title}
    </h1>

    {preview.cover
      ? <Image
        unoptimized
        width={1024}
        height={576}
        src={preview.cover instanceof File
          ? URL.createObjectURL(preview.cover || new Blob())
          : preview.cover
        }
        alt={preview.title}
        className="rounded-lg border-2 aspect-video
        border-neutral-200 dark:border-neutral-800"
      />
      : <div className="bg-spiral bg-cover aspect-video flex flex-col
        items-center justify-center text-xl rounded-lg
        bg-neutral-200 dark:bg-neutral-800"
      >
        <IconImageInPicture
          size={128}
          stroke={1.25}
        />

        {dictionary.blogs.preview.placeholder.cover}
      </div>
    }

    <article dangerouslySetInnerHTML={{
      __html: TypeWriter.markdownToHtml(
        preview.content || dictionary.blogs.preview.placeholder.content
      )
    }} />
  </article>
}

export default BlogPreview