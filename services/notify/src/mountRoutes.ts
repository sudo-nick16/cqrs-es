import { wrapAsync } from "@cqrs/common";
import { Express } from "./types";
import { handleClient } from "./controllers/client";
import sse from "./middlewares/sse";

const mountRoutes = (app: Express) => {
  app.get("/api/notify", sse, wrapAsync(handleClient));
};

export default mountRoutes;
