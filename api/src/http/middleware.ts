import helmet from "koa-helmet";
import cors from "@koa/cors";

import * as HTTPErrors from "@app/http/errors";

import type { Middleware } from "koa";

export const security = (): Middleware => {
  const security = helmet();

  return security;
};

export const corsPolicy = (): Middleware => {
  const corsPolicy = cors();

  return corsPolicy;
};

export const errorHandler = ({
  returnStack,
}: {
  returnStack?: boolean;
}): Middleware => {
  const globalServerErrorHandler: Middleware = async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      const err = e as Error & { statusCode: number };
      const status = err.statusCode || 500;

      const message =
        err.message ||
        "Internal Error. Please contact the service admin and tell them their service is on fire.";
      const stack = returnStack ? err.stack : "";

      ctx.status = status;
      ctx.body = {
        error: {
          message,
          status,
          stack,
        },
      };
    }
  };

  return globalServerErrorHandler;
};

export const notFoundIsError = (): Middleware => {
  const notFoundIsError: Middleware = async (ctx, next) => {
    await next();

    if (!ctx.body && ctx.status !== 204) {
      throw new HTTPErrors.NotFound(ctx.url);
    }
  };

  return notFoundIsError;
};
