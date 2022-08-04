import { createKafkaClient, createKafkaConsumer } from "./kafkaClient";

const createConfig = async ({ env }: any) => {
  const kafkaClient = createKafkaClient({
    clientId: env.kafkaClientId,
    brokers: env.kafkaBrokers.split(","),
  });

  const kafkaConsumer = await createKafkaConsumer({
    kafka: kafkaClient,
    groupId: env.kafkaGroupId,
    subscriptionConfig: {
      topics: env.kafkaTopics.split(","),
      fromBeginning: false,
    },
  });

  return {
    kafkaClient,
    kafkaConsumer,
  };
};

export default createConfig;
