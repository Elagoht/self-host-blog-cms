class RepositoryError extends Error {
  reason: RepositoryErrorReason

  constructor(message: string, reason: RepositoryErrorReason) {
    super(message)
    this.reason = reason
    this.name = "RepositoryError"
  }
}

type RepositoryErrorReason = "NotFound" | "InvalidSort"


export default RepositoryError