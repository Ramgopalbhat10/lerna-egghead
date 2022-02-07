import { Handler } from "@netlify/functions";
import oauth2, { config } from "./utils/oauth";

export const handler: Handler = async (event, context, callback) => {
  const code = event.queryStringParameters.code;
  // const state = event.queryStringParameters.state

  const tokenParam = {
    code: code,
    redirect_uri: config.redirect_uri,
  };
  try {
    const accessToken = await oauth2.getToken(tokenParam);
    return {
      statusCode: 200,
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
