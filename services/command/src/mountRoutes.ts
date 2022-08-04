import { wrapAsync } from "@cqrs/common";
import { createUser, updateUser } from "./controllers/user";
import { Express } from "./types";

const mountRoutes = (app: Express, config: any) => {
  app.route("/api/users").post(
    wrapAsync(
      createUser({
        producer: config.kafkaProducer,
        config: {
          topic: config.kafkaTopic,
        },
      })
    )
  );
  app.route("/api/users").patch(
    wrapAsync(
      updateUser({
        producer: config.kafkaProducer,
        config: {
          topic: config.kafkaTopic,
        },
      })
    )
  );
};

export default mountRoutes;
