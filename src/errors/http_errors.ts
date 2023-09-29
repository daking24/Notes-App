class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
/**
 * Status code 401 (Unauthorized)
 * @param message
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status code 409 (Conflict)
 * @param message
 */
export class ConflictError extends HttpError {}

// Add more error types here as needed.