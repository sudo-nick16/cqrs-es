import { Request, Response } from "express";
import { USER_CREATED, USER_UPDATED } from "@cqrs/common";
import { CreateUserProp, UpdateUserProp } from "../types";

export const createUser = ({ producer, config }: CreateUserProp) => {
  return async (req: Request, res: Response) => {
    const { name, email, password, username, clientId } = req.body;
    if (!clientId) {
      console.error("Notify service failed");
    }
    if (!name || !email || !password || !username) {
      return res.status(400).json({ error: "Please fill all the fields." });
    }
    const event = {
      event: USER_CREATED,
      data: { name, email, password, username },
      clientId,
    };
    await producer.send({
      topic: config.topic,
      messages: [
        {
          key: USER_CREATED,
          value: JSON.stringify(event),
          timestamp: Date.now().toString(),
        },
      ],
    });
    console.log("Command service sent event: ", event);
    return res.status(201).json({ message: "wait bitch.." });
  };
};

export const updateUser = ({ producer, config }: UpdateUserProp) => {
  return async (req: Request, res: Response) => {
    const { name, email, username } = req.body;
    if (!(name || email || username)) {
      return res.status(400).json({ error: "Please fill all the fields." });
    }
    const event = {
      event: USER_UPDATED,
      fields: {
        name: name || null,
        email: email || null,
        username: username || null,
      },
    };
    await producer.send({
      topic: config.topic,
      messages: [
        {
          key: USER_UPDATED,
          value: JSON.stringify(event),
          timestamp: Date.toString(),
        },
      ],
    });
    return res.status(200).json({ message: "User updated successfully." });
  };
};
