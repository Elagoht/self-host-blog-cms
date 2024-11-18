import convertMarkdownToHtml from "@/lib/markdown/markdown-it"

class TypeWriter {
  private static wordsPerMinute = 200

  public static markdownToHtml = convertMarkdownToHtml

  public static readTime = (
    text: string
  ): number => Math.ceil(
    text.split(
      /\s+/
    ).filter(word =>
      word.length > 0
    ).length / TypeWriter.wordsPerMinute
  )
}

export default TypeWriter