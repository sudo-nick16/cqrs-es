import { Consumer, Kafka } from "kafkajs";
import { KafkaClientProp, KafkaConsumerProp } from "./types";

export const createKafkaClient = (config: KafkaClientProp): Kafka => {
  const kafka = new Kafka({
    clientId: config.clientId,
    brokers: [...config.brokers],
  });
  return kafka;
};

export const createKafkaConsumer = async ({
  kafka,
  config,
}: KafkaConsumerProp): Promise<Consumer> => {
  const consumer: Consumer = kafka.consumer({ groupId: config.groupId });
  await consumer.connect();
  await consumer.subscribe({
    ...config,
  });
  return consumer;
};
