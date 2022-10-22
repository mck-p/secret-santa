import * as opentelemetry from "@opentelemetry/api-metrics";
import { MeterProvider } from "@opentelemetry/sdk-metrics";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";

import Log from "@app/monitoring/log";

const log = Log.child({
  reason: "metric",
});

/**
 * Expose Metrics at <port>
 */
const options = { port: 9464, startServer: true };
const exporter = new PrometheusExporter(options);

const meterProvider = new MeterProvider();
meterProvider.addMetricReader(exporter);

opentelemetry.metrics.setGlobalMeterProvider(meterProvider);

const healthchecksRequestedMetric = opentelemetry.metrics
  .getMeter("api")
  .createCounter("healthcheck.requested", {
    description:
      "The amount of times that this service has seen a request for a Healthcheck come in.",
  });

const healthchecksPassedMetric = opentelemetry.metrics
  .getMeter("api")
  .createCounter("healthcheck.passed", {
    description:
      "The amount of times that this service has passed a received Healthcheck.",
  });

const healthchecksFailedMetric = opentelemetry.metrics
  .getMeter("api")
  .createCounter("healthcheck.failed", {
    description:
      "The amount of times that this service has failed a received Healthcheck.",
  });

export const healthchecksRequested = (tags?: { [x: string]: string }) => {
  log.trace({ msg: "Healthcheck Requested", tags });
  healthchecksRequestedMetric.add(1, {
    ...tags,
    host: process.env.HOSTNAME,
  });
};

export const healthchecksPassed = (tags?: { [x: string]: string }) => {
  log.trace({ msg: "Healthcheck Passed", tags });
  healthchecksPassedMetric.add(1, tags);
};

export const healthchecksFailed = (tags?: { [x: string]: string }) => {
  log.trace({ msg: "Healthcheck Failed", tags });
  healthchecksFailedMetric.add(1, tags);
};
