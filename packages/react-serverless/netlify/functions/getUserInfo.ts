import { Handler } from "@netlify/functions";
import { redis } from "./utils/redis";

type RequestBody = {
  userId: string;
};
type ResponseBody = {
  userId: string;
  token: string;
};

export const handler: Handler = async (event) => {
  const { userId }: RequestBody = JSON.parse(event.body);
  const data: ResponseBody = await redis.get(userId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      token: data.token,
    }),
  };
};
