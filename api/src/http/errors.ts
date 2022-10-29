export class NotFound extends Error {
  statusCode = 404;

  constructor(resource: string) {
    super();

    this.message = `Cannot find resource "${resource}".`;
  }
}

export class Internal extends Error {
  statusCode = 500;
  cause?: Error;

  constructor(cause?: Error) {
    super();
    this.cause = cause;

    this.message =
      "Internal Server Error. Please try your request again at a later time.";
  }
}

export class NotImplemented extends Error {
  statusCode = 501;
  cause?: Error;

  constructor(cause?: Error) {
    super();
    this.cause = cause;
    this.message = `We are sorry that we have not implemented that yet!`;
  }
}
