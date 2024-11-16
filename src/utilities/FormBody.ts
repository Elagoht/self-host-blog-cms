import { Schema } from "yup"
import Message from "./Message"
import dictionary from "@/i18n"

export default class FormBody<T = Record<string, unknown>> {
  private readonly data: T

  public constructor(data: T | FormData) {
    this.data = data instanceof FormData
      ? Object.fromEntries(data) as T
      : this.data = data
  }

  public static async fromRequest<T>(
    request: Request,
    type: "json" | "form" = "json"
  ): Promise<FormBody<T>> {
    try {
      return new FormBody(type === "json"
        ? await request.json()
        : await request.formData())
    } catch {
      throw new FormBodyError(dictionary.api.error.badRequest)
    }
  }

  public get<Type>(key: string): Type {
    if (!this.data[key as keyof T])
      throw new FormBodyError("api.validate", { key })
    return this.data[key as keyof T] as Type
  }

  public has(key: string): boolean {
    return this.data[key as keyof T] !== undefined
  }

  public async validate(schema: Schema): Promise<T> {
    try {
      await schema.validate(this.data)
      return this.data
    } catch (error) {
      throw new FormBodyError((error as { errors: string[] }).errors[0])
    }
  }
}

export class FormBodyError extends Error {
  constructor(message: string, args?: Record<string, string>) {
    super(message)
    this.name = "ValidateError"
    this.message = Message.format(message, args)
  }
}