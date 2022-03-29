import { Handler } from "@netlify/functions";
import oauth2, { config } from "./utils/oauth";
require("dotenv").config();
import Redis from "ioredis";
const redis = new Redis(process.env.DB_CONNECTION_URL);

export const handler: Handler = async (event, context, callback) => {
  const { code } = event.queryStringParameters;

  const tokenParam = {
    code: code,
    redirect_uri: config.redirect_uri,
  };
  try {
    const accessToken = await oauth2.getToken(tokenParam);
    console.log("Access token is -> ", accessToken);

    const userId = accessToken.token["user_id"];
    const token = accessToken.token["access_token"];
    const userDetails = {
      userId,
      token,
    };
    redis.set(userId, JSON.stringify(userDetails));

    return {
      statusCode: 302,
      headers: {
        Location: `https://fitbit-serverless.netlify.app`,
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
