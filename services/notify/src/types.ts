export declare type Kafka = import("kafkajs").Kafka;
export declare type Consumer = import("kafkajs").Consumer;
export declare type ConsumerSubscribeTopics =
  import("kafkajs").ConsumerSubscribeTopics;
export declare type Express = import("express").Express;

export type KafkaConsumerProp = {
  kafka: Kafka;
  groupId: string;
  subscriptionConfig: ConsumerSubscribeTopics;
};
