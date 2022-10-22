import type { Middleware } from "koa";
import * as Metrics from "@app/monitoring/metrics";

export const healthcheck: Middleware = async (ctx, next) => {
  Metrics.healthchecksRequested();

  try {
    ctx.status = 200;
    ctx.body = {
      data: {
        message:
          "I _AM_ healthy! Thanks for asking. How about yourself? You getting enough fluids? Have you walked recently?",
      },
    };

    Metrics.healthchecksPassed();
  } catch (e: any) {
    Metrics.healthchecksFailed({ err: e.message });

    throw e;
  }
};

export default healthcheck;
