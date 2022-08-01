import express, { NextFunction, Request, Response } from "express";
import { Kafka } from "kafkajs";
import { createUser, updateUser } from "./controllers/user";
import { wrapAsync } from "@cqrs/common";
import cors from "cors";

(async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const kafka = new Kafka({
    clientId: "command-service",
    brokers: ["localhost:9092"],
  });
  const producer = kafka.producer();
  await producer.connect();

  app.route("/api/users").post(wrapAsync(createUser(producer)));
  app.route("/api/users").patch(wrapAsync(updateUser(producer)));

  app.use((err: any, _: Request, res: Response, __: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  app.listen(5000, () => {
    console.log("Command Service started on port 5000");
  });
})();
