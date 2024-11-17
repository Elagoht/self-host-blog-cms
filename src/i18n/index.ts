import dictionary from "./en.json"
export default dictionary

declare global {
  type Dictionary = typeof dictionary
}