import { Handler } from "@netlify/functions";
import oauth2, { config } from "./utils/oauth";

export const handler: Handler = (event, context, callback) => {
  const authorizationURI = oauth2.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: "activity heartrate location nutrition profile sleep weight",
  });
  console.log("authorizationURI : ", authorizationURI);

  const response = {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
    body: "",
  };

  return callback(null, response);
};
