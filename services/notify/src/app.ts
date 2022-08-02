import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mountRoutes from "./mountRoutes";

const createExpressApp = () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );
  mountRoutes(app);
  app.use((err: any, _: Request, res: Response, __: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
  return app;
};

export default createExpressApp;
