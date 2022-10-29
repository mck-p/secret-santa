import Koa from "koa";
import Router from "@koa/router";
import { Server as HTTPInstance } from "http";
import assert from "assert";

import healthcheck from "@app/http/healthcheck";

import * as Middleware from "@app/http/middleware";

class Server {
  #app: Koa;
  #router: Router;
  #instance?: HTTPInstance;

  constructor() {
    this.#app = new Koa();

    this.#app
      .use(Middleware.errorHandler({ returnStack: true }))
      .use(Middleware.notFoundIsError())
      .use(Middleware.appMetadataHeaders())
      .use(Middleware.security())
      .use(Middleware.corsPolicy())
      .use(Middleware.mapSystemErrorsToHTTPErrors());

    this.#router = new Router();

    this.#router.get("/healthcheck", healthcheck);

    this.#app.use(this.#router.routes());
  }

  registerRouter(router: Router, prefix?: string) {
    this.#router.use(router.routes());

    return this;
  }

  async start(port: number) {
    return new Promise((res, rej) => {
      try {
        assert(
          !this.#instance,
          "There can only be one instance of a Server at a time started."
        );

        this.#instance = this.#app.listen(port, () => {
          res(void 0);
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  async stop() {
    return new Promise((res) => {
      this.#instance?.close(() => {
        this.#instance = undefined;
        res(void 0);
      });
    });
  }
}

export default Server;
