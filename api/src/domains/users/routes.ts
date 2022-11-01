import Router from "@koa/router";
import Body from "koa-body";
import { sign } from "jsonwebtoken";
import Controller from "./controller";

const router = new Router({
  prefix: "/users",
});

const controller = new Controller();

router
  .post("/", Body(), (ctx, next) => {
    const { body } = ctx.request;

    const user = controller.create(body);

    ctx.status = 201;
    ctx.body = { data: user };
  })
  .get("/:id", async (ctx, next) => {
    const user = await controller.getById(ctx.params.id);

    ctx.body = { data: user };
  })
  .post("/authenticate", Body(), async (ctx, next) => {
    const valid = await controller.validatePassword(ctx.request.body);

    if (valid) {
      const jwt = await sign(
        {
          email: ctx.request.body.email,
        },
        process.env.JWT_SIGNING_SECRET!
      );
      ctx.body = {
        data: { token: jwt },
      };
    } else {
      ctx.status = 401;
      ctx.body = {
        error: {
          message: "Credentials Invalid.",
        },
      };
    }
  });

export default router;
