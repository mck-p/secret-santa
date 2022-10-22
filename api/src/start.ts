import Log from "@app/monitoring/log";
import Server from "@app/http/server";
import monitorProcess from "@app/monitoring/process";

const main = async () => {
  monitorProcess();

  const server = new Server();

  await server.start(5000);
  Log.trace("Listening!");
};

main();
