import { createContext, useContext, useMemo, useState } from "react";
import { FitbitProfile } from "@giveback007/fitbit-api";
import { IUserContext } from "@t/index";

const UserContext = createContext<IUserContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: "",
  setUserId: () => {},
  userProfile: undefined,
  setUserProfile: () => {},
});

function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useUserContext must be used within a UserProvider`);
  }
  return context;
}

function UserProvider(props?: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userProfile, setUserProfile] = useState<FitbitProfile | undefined>();
  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      userId,
      setUserId,
      userProfile,
      setUserProfile,
    }),
    [isLoggedIn, userId, userProfile]
  );
  return <UserContext.Provider value={value} {...props} />;
}

export { UserProvider, useUserContext };
