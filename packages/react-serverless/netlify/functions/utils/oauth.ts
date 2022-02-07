import { ClientCredentials, AuthorizationCode } from "simple-oauth2";

const fitbitApi = "https://api.fitbit.com";
const siteUrl = "https://fitbit-serverless.netlify.app";
const siteUrlLocal = "http://localhost:8888";

type Client = {
  id: string;
  secret: string;
};
type Auth = {
  tokenHost: string;
  tokenPath: string;
  authorizePath: string;
};
type Credentials = {
  client: Client;
  auth: Auth;
};

export const config = {
  clientId: "23829T",
  clientSecret: "89e60ac6953f517e38280b9b923009b7",
  tokenHost: fitbitApi,
  authorizePath: `${fitbitApi}/oauth2/authorize`,
  tokenPath: `${fitbitApi}/oauth2/token`,
  redirect_uri: `${siteUrl}/.netlify/functions/auth-callback`,
};

function authInstance(credentials: Credentials) {
  if (!credentials.client.id) {
    throw new Error("MISSING REQUIRED ENV VARS. Please set FITBIT_CLIENT_ID");
  }
  if (!credentials.client.secret) {
    throw new Error(
      "MISSING REQUIRED ENV VARS. Please set FITBIT_CLIENT_SECRET"
    );
  }
  // return auth instance
  return new AuthorizationCode(credentials);
}

export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret,
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath,
  },
});
