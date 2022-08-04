import { createKafkaClient, createKafkaProducer } from "./kafkaClient";

const createConfig = async ({ env }: any) => {
  const kafka = createKafkaClient({
    clientId: env.kafkaClientId,
    brokers: env.kafkaBroker.split(","),
  });
  const kafkaProducer = await createKafkaProducer({
    kafka,
    producerConfig: {
      allowAutoTopicCreation: env.env === "development",
    },
  });

  const kafkaTopic = env.kafkaTopic;

  return {
    kafka,
    kafkaProducer,
    kafkaTopic
  };
};

export default createConfig;
