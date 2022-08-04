export declare type Kafka = import("kafkajs").Kafka;
export declare type Express = import("express").Express;

export type KafkaProducerProp = {
  kafka: Kafka;
  producerConfig: import("kafkajs").ProducerConfig;
};

export type CreateUserProp = {
  producer: import("kafkajs").Producer;
  config: {
    topic: string;
  };
};

export type UpdateUserProp = CreateUserProp;
