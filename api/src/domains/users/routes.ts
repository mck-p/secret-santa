import Router from "@koa/router";
import Body from "koa-body";
import * as SystemErrors from "@app/errors";

const router = new Router({
  prefix: "/users",
});

router.post("/", Body(), (ctx, next) => {
  throw new SystemErrors.NotImplemented("Creating a User");
});

export default router;
