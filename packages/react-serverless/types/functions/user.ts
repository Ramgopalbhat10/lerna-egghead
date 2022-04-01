import { FitbitProfile } from "@giveback007/fitbit-api";

export type IUserToken = {
  userId: string;
  token: string;
};

export type IUserIdInput = {
  userId: string;
};

export type IUserDetails = {
  user: FitbitProfile;
};
