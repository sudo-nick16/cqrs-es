import { Request, Response } from "express";
import { addClient } from "../store";

export const handleClient = async (req: Request, res: Response) => {
  return addClient(req, res);
};
