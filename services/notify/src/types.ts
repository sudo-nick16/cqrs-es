export declare type Kafka = import("kafkajs").Kafka;
export declare type Consumer = import("kafkajs").Consumer;
export declare type Express = import("express").Express;

export type KafkaClientProp = { clientId: string; brokers: string[] };

export type KafkaConsumerProp = {
  kafka: Kafka;
  config: {
    groupId: string;
    topic: string;
    fromBeginning: boolean;
  };
};
