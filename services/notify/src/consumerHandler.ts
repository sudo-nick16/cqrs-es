import { notifyClient } from "./clientStore";
import { USER_CREATED, USER_CREATION_FAILED } from "@cqrs/common";

const consumerHandler = {
  eachMessage: async ({ message }: any) => {
    const { event, data, clientId } = JSON.parse(message!.value!.toString());

    console.table([
      ["Service", "notify"],
      ["Event", event],
      ["data", JSON.stringify(data, null, 2)],
      ["clientId", clientId],
    ]);

    switch (event) {
      case USER_CREATED:
        notifyClient(data, clientId, "User created successfully.");
        break;
      case USER_CREATION_FAILED:
        notifyClient(data, clientId, "User creation failed.");
        break;
      default:
        break;
    }
  },
};

export default consumerHandler;
