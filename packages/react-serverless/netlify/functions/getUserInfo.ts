import { Handler } from "@netlify/functions";
import { IUserIdInput, IUserTokenResponse } from "../../types";
import { redis } from "./utils/redis";

export const handler: Handler = async (event) => {
  const { userId }: IUserIdInput = JSON.parse(event.body);
  const { token }: IUserTokenResponse = await redis.get(userId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      userId,
      token,
    }),
  };
};
