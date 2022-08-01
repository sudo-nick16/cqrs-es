import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import { Kafka } from "kafkajs";
import { getUser } from "./controllers/user";
import { wrapAsync } from "@cqrs/common";
import createUser from "./eventHandlers/createUser";
import cors from "cors";
import dotenv from "dotenv";
import { USER_CREATED } from "./events";

dotenv.config();

(async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const kafka = new Kafka({
    clientId: "command-service",
    brokers: ["localhost:9092"],
  });

  mongoose.connect(
    "mongodb://localhost:27017/cqrs",
    {
      autoIndex: true,
    },
    () => {
      console.log("Connected to MongoDB");
    }
  );

  const producer = kafka.producer();
  await producer.connect();

  const consumer = kafka.consumer({ groupId: "query-service" });
  await consumer.connect();
  await consumer.subscribe({ topic: "users", fromBeginning: false });

  (async () => {
    await consumer.run({
      eachMessage: async ({ message }) => {
        const { event, data, clientId } = JSON.parse(message!.value!.toString());

        console.log(
          "Query service received event: ",
          message!.value!.toString(),
          event,
          "\ndata",
          JSON.stringify(data, null, 2)
        );

        switch (event) {
          case USER_CREATED:
            await createUser(data, producer, clientId);
            break;
          default:
            break;
        }
      },
    });
  })();

  app.route("/api/users/:id").post(wrapAsync(getUser));
  app.route("/api/users/stream").get(wrapAsync(getUser));

  app.use((err: any, _: Request, res: Response, __: NextFunction) => {
    console.log(err);
    res.status(500).send("Something broke!");
  });

  app.listen(5001, () => {
    console.log("Query Service started on port 50001");
  });
})();
