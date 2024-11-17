import dictionary from "@/i18n"
import TypeWriter from "@/utilities/TypeWriter"
import { IconImageInPicture } from "@tabler/icons-react"
import Image from "next/image"
import { FC } from "react"

interface IBlogPreviewProps {
  dictionary: Dictionary
  preview: {
    title: string
    cover: File | null
    content: string
  }
}

const BlogPreview: FC<IBlogPreviewProps> = ({ preview }) => {
  return <article className="prose prose-neutral dark:prose-invert max-w-none w-full">
    <span className="text-2xl text-neutral-500 font-bold">{dictionary.blogs.preview.title}</span>

    <hr />

    <h1 className="line-clamp-2">
      {preview.title || dictionary.blogs.preview.placeholder.title}
    </h1>

    {preview.cover
      ? <Image
        unoptimized
        width={1024}
        height={576}
        src={URL.createObjectURL(preview.cover || new Blob())}
        alt={preview.title}
        className="rounded-lg border-2 border-neutral-200 dark:border-neutral-800 aspect-video"
      />
      : <div className="bg-spiral bg-cover aspect-video flex flex-col items-center justify-center text-xl bg-neutral-200 dark:bg-neutral-800 rounded-lg" >
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