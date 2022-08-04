import { Kafka, KafkaConfig, Producer } from "kafkajs";
import { KafkaProducerProp } from "./types";

export const createKafkaClient = (config: KafkaConfig): Kafka => {
  const kafka = new Kafka({
    clientId: config.clientId,
    brokers: config.brokers,
  });
  return kafka;
};

export const createKafkaProducer = async ({
  kafka,
  producerConfig,
}: KafkaProducerProp): Promise<Producer> => {
  const producer: Producer = kafka.producer({ ...producerConfig });
  await producer.connect();
  return producer;
};
