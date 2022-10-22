import Koa from "koa";
import Router from "@koa/router";
import { Server as HTTPInstance } from "http";
import assert from "assert";

import healthcheck from "@app/http/healthcheck";

import * as Middleware from "@app/http/middleware";

class Server {
  #app: Koa;
  #instance?: HTTPInstance;
  #router: Router;

  constructor() {
    this.#app = new Koa();

    this.#app
      .use(Middleware.errorHandler({ returnStack: true }))
      .use(Middleware.notFoundIsError())
      .use(Middleware.security())
      .use(Middleware.corsPolicy())
      .use(healthcheck);

    this.#router = new Router();
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
