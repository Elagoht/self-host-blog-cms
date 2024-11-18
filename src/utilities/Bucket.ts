import path from "path"
import fs from "node:fs/promises"
import { Sharp } from "sharp"

class Bucket {
  private static readonly path = path.join(
    process.cwd(),
    process.env.UPLOADS_DIR ?? "uploads"
  )

  public static checkBucket = async (): Promise<void> => {
    await fs.access(Bucket.path).catch(async () =>
      await fs.mkdir(Bucket.path, {
        recursive: true
      }).catch(() => {
        throw new BucketError("create")
      })
    )
  }

  public static createDirectory = async (
    directory: string
  ): Promise<void> => {
    await Bucket.checkBucket()
    const newDirectory = path.join(Bucket.path, directory)

    await fs.access(newDirectory).catch(async () => {
      await fs.mkdir(newDirectory, {
        recursive: true
      }).catch(() => {
        throw new BucketError("directory")
      })
    })
  }

  public static uploadFile = async (
    file: File | Sharp,
    filePath: string
  ): Promise<string> => {
    await Bucket.createDirectory(path.dirname(filePath))

    try {
      if (file instanceof File) await fs.writeFile(
        path.join(Bucket.path, filePath),
        Buffer.from(await file.arrayBuffer())
      )
      else await file.toFile(path.join(Bucket.path, filePath))
      return filePath
    } catch {
      throw new BucketError("save")
    }
  }

  public static getFile = async (
    filePath: string
  ): Promise<Buffer> => {
    try { return await fs.readFile(path.join(Bucket.path, filePath)) }
    catch { throw new BucketError("read") }
  }

  public static matchFiles = async (
    pattern: RegExp,
    directory?: string,
    recursive: boolean = false
  ): Promise<string[]> => {
    try {
      const files = await fs.readdir(
        path.join(Bucket.path, directory ?? ""), {
        recursive
      })

      return files.filter(file => pattern.test(file))
    } catch { throw new BucketError("read") }
  }

  public static deleteFile = async (
    filePath: string
  ): Promise<void> =>
    await fs.unlink(path.join(Bucket.path, filePath))

  public static deleteDirectory = async (directory: string) => {
    try {
      await fs.rmdir(path.join(Bucket.path, directory), {
        recursive: true
      })
    }
    catch { throw new BucketError("delete") }
  }

  public static deleteMatchingFiles = async (
    directory: string,
    whitelist: RegExp,
    blacklist?: RegExp
  ): Promise<void> => {
    try {
      for (const file of await Bucket.matchFiles(whitelist, directory)) {
        if (blacklist && blacklist.test(file)) continue
        await Bucket.deleteFile(path.join(directory, file))
      }
    } catch { throw new BucketError("delete") }
  }
}

type BucketErrorType = "save" | "create" | "directory" | "delete" | "read"

export class BucketError extends Error {

  constructor(type: BucketErrorType) {
    let message: string
    switch (type) {
      case "save":
        message = "The file could not be saved"
        break
      case "create":
        message = "The bucket could not be created"
        break
      case "directory":
        message = "The directory could not be created"
        break
      case "delete":
        message = "The file could not be deleted"
        break
      case "read":
        message = "The file could not be read"
        break
      default:
        message = "An unknown error occurred with the bucket"
    }
    super(message)
    this.name = "BucketError"
  }
}

export default Bucket
