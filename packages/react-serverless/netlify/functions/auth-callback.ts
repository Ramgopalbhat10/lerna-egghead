import { Handler } from "@netlify/functions";
import { IUserToken } from "../../types";
import oauth2, { config } from "./utils/oauth";
import { redis } from "./utils/redis";

export const handler: Handler = async (event, context, callback) => {
  const { code } = event.queryStringParameters;

  const tokenParam = {
    code: code,
    redirect_uri: config.redirect_uri,
  };
  try {
    const accessToken = await oauth2.getToken(tokenParam);
    const userId = accessToken.token["user_id"];
    const token = accessToken.token["access_token"];
    const userDetails: IUserToken = {
      userId,
      token,
    };
    await redis.set(userId, JSON.stringify(userDetails));

    return {
      statusCode: 302,
      headers: {
        Location: `https://fitbit-serverless.netlify.app/login?userId=${userId}&token=${token}`,
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    };
  } catch (err) {
    console.error("Access token error", err.message);
    console.error(err);

    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
