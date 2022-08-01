import { Request, Response } from "express";
import User from "../model/user";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
