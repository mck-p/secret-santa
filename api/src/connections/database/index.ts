import { Pool } from "pg";
import Log from "@app/monitoring/log";
import * as Metrics from "@app/monitoring/metrics";

let pool: Pool | undefined;

const log = Log.child({ name: "database connection" });

export const connect = () =>
  (pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  }));

export const query = (query: any, args: any) => pool?.query(query, args);

export const isHealthy = () => {
  Metrics.datbaseHealthycheckRequested();

  return (
    pool
      ?.query("SELECT NOW()")
      .then(() => {
        Metrics.datbaseHealthycheckPassed();

        return true;
      })
      .catch((err) => {
        log.warn({ err }, "Error while checking for database health.");
        Metrics.datbaseHealthycheckFailed();

        return false;
      }) || Promise.resolve(false)
  );
};
