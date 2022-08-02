import { v4 } from "uuid";
import { Request, Response } from "express";
import serialize from "./utils/serialize";

const clients: { [key: string]: Response } & {} = {};

export const addClient = (req: Request, res: Response) => {
  const clientId = v4();

  clients[clientId] = res;

  res.write(serialize({ clientId, msg: "Connected" }));

  req.on("close", () => {
    res.end();
    console.log("Connection closed --", clientId);
    delete clients[clientId];
  });
};

export const removeClient = (clientId: string) => {
  if (clients[clientId]) {
    clients[clientId].end();
    delete clients[clientId];
  }
};

export const notifyClient = (data: string, clientId: string, msg: string) => {
  if (clients[clientId]) {
    console.log("notify", clientId);
    clients[clientId].write(serialize({ msg, data, clientId }));
  }
};
