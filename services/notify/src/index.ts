import createExpressApp from "./app";
import createConfig from "./config";
import consumerHandler from "./consumerHandler";
import env from "./env";

export const start = async () => {
  const config = await createConfig({ env });
  config.kafkaConsumer.run(consumerHandler);
  const app = createExpressApp();
  app.listen(env.port, signalSeviceStart);
};

const signalSeviceStart = () => {
  console.log(`${env.appName} service started on port ${env.port}`);
  console.table([
    ["Port", env.port],
    ["Environment", env.env],
  ]);
};
