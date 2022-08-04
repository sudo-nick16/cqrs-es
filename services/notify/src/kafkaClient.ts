import { Consumer, Kafka, KafkaConfig } from "kafkajs";
import { KafkaConsumerProp } from "./types";

export const createKafkaClient = (config: KafkaConfig): Kafka => {
  const kafka = new Kafka({
    clientId: config.clientId,
    brokers: config.brokers,
  });
  return kafka;
};

export const createKafkaConsumer = async ({
  kafka,
  groupId,
  subscriptionConfig,
}: KafkaConsumerProp): Promise<Consumer> => {
  const consumer: Consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({
    ...subscriptionConfig,
  });
  return consumer;
};
