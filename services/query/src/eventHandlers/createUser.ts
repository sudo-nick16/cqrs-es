import { Producer } from "kafkajs";
import { USER_CREATED, USER_CREATION_FAILED } from "../events";
import User from "../model/user";

interface IUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

const createUser = async (
  data: IUser,
  producer: Producer,
  clientId: string
) => {
  const { name, email, password, username } = data;
  try {
    const user = await User.create({ name, email, password, username });
    if (user) {
      console.log("User created : ", JSON.stringify(user, null, 2));

      const eventMessage = {
        key: USER_CREATED,
        value: JSON.stringify({
          event: USER_CREATED,
          data: {
            name,
            email,
            password,
            username,
          },
          clientId,
        }),
        timestamp: Date.now().toString(),
      };

      console.log("Sending event: ", eventMessage);

      await producer.send({
        topic: "notifications",
        messages: [eventMessage],
      });
    } else {
      console.log("User not created");
    }
  } catch (err) {
    console.log(err, "User not created - QUERY SERVICE");
    const eventMessage = {
      key: USER_CREATION_FAILED,
      value: JSON.stringify({
        event: USER_CREATION_FAILED,
        data: {},
        clientId,
      }),
      timestamp: Date.now().toString(),
    };
    await producer.send({
      topic: "notifications",
      messages: [eventMessage],
    });
  }
};

export default createUser;
