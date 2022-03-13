import { Handler } from "@netlify/functions";
import qs from "querystring";
import oauth2, { config } from "./utils/oauth";

export const handler: Handler = async (event, context, callback) => {
  const { code, state } = event.queryStringParameters;
  const { url } = qs.parse(state);
  console.log("Url is -> ", url);

  const tokenParam = {
    code: code,
    redirect_uri: config.redirect_uri,
  };
  try {
    const accessToken = await oauth2.getToken(tokenParam);
    return {
      statusCode: 200,
      headers: {
        Location: `${url}&token=${accessToken}`,
        "Cache-Control": "no-cache",
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
