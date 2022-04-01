import { FitbitProfile } from "@giveback007/fitbit-api";

export type IUserContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (l: boolean) => void;
  userId: string;
  setUserId: (i: string) => void;
  userProfile?: FitbitProfile;
  setUserProfile: (u: FitbitProfile) => void;
};
