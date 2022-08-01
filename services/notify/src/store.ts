import { Request, Response } from "express";
import { v4 } from "uuid";

const clients: { [key: string]: Response } & {} = {};

export const addClient = (req: Request, res: Response) => {
  const clientId = v4();

  console.log("new connection");

  clients[clientId] = res;

  res.write("data: " + JSON.stringify({ clientId, msg: "Connected" }) + "\n\n");

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
    clients[clientId].write("data: " + JSON.stringify({ msg, data, clientId }) + "\n\n");
  }
};
