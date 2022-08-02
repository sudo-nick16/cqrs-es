import { createKafkaClient, createKafkaConsumer } from "./kafkaClient";

const createConfig = async ({ env }: any) => {
  const kafkaClient = createKafkaClient({
    clientId: env.kafkaClientId,
    brokers: [env.kafkaBroker],
  });

  const kafkaConsumer = await createKafkaConsumer({
    kafka: kafkaClient,
    config: {
      groupId: env.kafkaGroupId,
      topic: env.kafkaTopic,
      fromBeginning: false,
    },
  });

  return {
    kafkaClient,
    kafkaConsumer,
  };
};

export default createConfig;
