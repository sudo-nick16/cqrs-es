import dotenv from "dotenv";

const envResult = dotenv.config();

if (envResult.error) {
  console.error(`"[ERROR] env failed to load:")} ${envResult.error}`);
  process.exit(1);
}

const requireFromEnv = (key: string): string => {
  if (!process.env[key]) {
    console.error(`"[APP ERROR] Missing env variable:")} ${key}`);
    return process.exit(1);
  }
  return process.env[key]!;
};

export default {
  appName: requireFromEnv("APP_NAME"),
  port: parseInt(requireFromEnv("PORT"), 10),
  env: requireFromEnv("NODE_ENV"),
  kafkaBrokers: requireFromEnv("KAFKA_BROKERS"),
  kafkaClientId: requireFromEnv("KAFKA_CLIENT_ID"),
  kafkaTopics: requireFromEnv("KAFKA_TOPICS"),
  kafkaGroupId: requireFromEnv("KAFKA_GROUP_ID"),
};
