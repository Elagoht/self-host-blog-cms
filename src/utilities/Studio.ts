import sharp from "sharp"

class Studio {
  private photo: File

  public constructor(photo: File) {
    this.photo = photo
  }

  public printPhoto = async (
    width: number = 1280, height: number = 720
  ) => sharp(
    Buffer.from(await this.photo.arrayBuffer())
  ).resize(
    width, height
  ).toFormat("webp")
}

export default Studio