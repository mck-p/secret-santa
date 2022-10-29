import Log from "@app/monitoring/log";
import Server from "@app/http/server";
import monitorProcess from "@app/monitoring/process";
import UserRoutes from "@app/domains/users/routes";
import * as DB from "@app/connections/database";

const connectToBackingServices = () => Promise.all([DB.connect()]);

const main = async () => {
  monitorProcess();

  await connectToBackingServices();

  const server = new Server();

  server.registerRouter(UserRoutes);

  await server.start(5000);

  Log.trace("Listening!");
};

main();
