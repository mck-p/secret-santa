export class NotFound extends Error {
  statusCode = 404;
  constructor(resource: string) {
    super();

    this.message = `Cannot find resource "${resource}".`;
  }
}
