import Joi from "joi";
import bcrypt from "bcrypt";

import Log from "@app/monitoring/log";
import { getPool } from "@app/connections/database";

import {
  createUser,
  findUserById,
  getPasswordByEmail,
} from "./sql/queries.queries";

import type { ICreateUserParams } from "./sql/queries.queries";
import { Pool } from "pg";

class Users {
  #log = Log.child({
    module: "domains::users::controller",
  });

  #schemas = {
    create: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(1000).required(),
      metadata: Joi.object().default({}),
    }),
  };

  #client: Pool;

  constructor() {
    this.#client = getPool();
  }

  async create(userParams: ICreateUserParams) {
    const result = this.#schemas.create.validate(userParams);

    if (result.error) {
      throw result.error;
    }

    const userConfig = result.value;

    userConfig.password = await bcrypt.hash(userConfig.password, 10);

    const [user] = await createUser.run(userConfig, this.#client);

    this.#log.trace({ id: user.id }, `Created User:${user.id}`);

    return user;
  }

  getById(id: string) {
    return findUserById.run({ id }, this.#client);
  }

  async validatePassword({
    email,
    password: plaintext,
  }: {
    email: string;
    password: string;
  }) {
    const [{ password }] = await getPasswordByEmail.run(
      { email },
      this.#client
    );

    return bcrypt.compare(plaintext, password!);
  }
}

export default Users;
