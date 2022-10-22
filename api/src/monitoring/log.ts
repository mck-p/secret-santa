import pino from "pino";

export default pino({
  level: "trace",
  serializers: pino.stdSerializers as any,
});
