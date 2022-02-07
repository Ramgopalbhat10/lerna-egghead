import { Handler } from "@netlify/functions";
import oauth2, { config } from "./utils/oauth";

export const handler: Handler = (event, context, callback) => {
  const authorizationURI = oauth2.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: "activity",
  });
  console.log("authorizationURI : ", authorizationURI);

  const response = {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      "Cache-Control": "no-cache",
    },
    body: "",
  };

  return callback(null, response);
};
