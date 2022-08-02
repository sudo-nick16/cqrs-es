import { Request, Response } from "express";
import { addClient } from "../clientStore";

export const handleClient = async (req: Request, res: Response) => {
  return addClient(req, res);
};
