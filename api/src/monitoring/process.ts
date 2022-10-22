import { setTimeout } from "timers/promises";
import Log from "@app/monitoring/log";

const log = Log.child({
  reason: "process-monitor",
});

const shutdownTookTooLong = Symbol("Shutdown Took Too Long");

export const monitorProcess = (
  shutdown: (err?: Error) => Promise<unknown> = () => Promise.resolve()
) => {
  const handleError = async (err: Error) => {
    console.log(err, "ERROR");
    setTimeout(1000);
    const result = await Promise.race([
      shutdown(err),
      setTimeout(1000).then(() => shutdownTookTooLong),
    ]);

    if (result === shutdownTookTooLong) {
      log.warn(
        { err },
        "Shutdown took too long. We are going to shutdown regardless now."
      );
    }

    log.fatal({ err }, "Uncaught error at top level. Exitting 1");
    process.exit(1);
  };

  process
    .on("uncaughtException", handleError)
    .on("unhandledRejection", handleError)
    .on("SIGTERM", async () => {
      log.debug("Asked to shutdown");
      const result = await Promise.race([
        shutdown(),
        setTimeout(1000).then(() => shutdownTookTooLong),
      ]);

      if (result === shutdownTookTooLong) {
        log.warn(
          "Shutdown took too long. We are going to shutdown regardless now."
        );
      }

      process.exit(0);
    });
};

export default monitorProcess;
