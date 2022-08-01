import express, { NextFunction, Request, Response } from "express";
import { Kafka } from "kafkajs";
import { handleClient } from "./controllers/client";
import { wrapAsync } from "@cqrs/common";
import cors from "cors";
import { notifyClient } from "./store";
import dotenv from "dotenv";
import sse from "./middleware/sse";
import { USER_CREATED, USER_CREATION_FAILED } from "./events";

dotenv.config();

(async () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );

  const kafka = new Kafka({
    clientId: "notify-service",
    brokers: ["localhost:9092"],
  });

  const consumer = kafka.consumer({ groupId: "notif-service" });
  await consumer.connect();
  await consumer.subscribe({ topic: "notifications", fromBeginning: false });

  (async () => {
    await consumer.run({
      eachMessage: async ({ message }) => {
        const { event, data, clientId } = JSON.parse(
          message!.value!.toString()
        );

        console.log(
          "Notify service received event: ",
          event,
          "\ndata",
          JSON.stringify(data, null, 2),
          "\nclientId",
          clientId
        );

        switch (event) {
          case USER_CREATED:
            notifyClient(data, clientId, "User created successfully.");
            break;
          case USER_CREATION_FAILED:
            notifyClient(data, clientId, "User creation failed.");
            break;
          default:
            break;
        }
      },
    });
  })();

  app.get("/api/notify", sse, wrapAsync(handleClient));

  app.use((err: any, _: Request, res: Response, __: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  app.listen(5003, () => {
    console.log("Command Service started on port 5003");
  });
})();
