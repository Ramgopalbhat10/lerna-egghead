import { useEffect, useState } from "react";
import { FitbitProfile } from "@giveback007/fitbit-api/dist";
import { useUserContext } from "@/context/user-context";
import { getUserProfile, getUserToken } from "@/api/getUserData";

type IUserDetails = {
  user: FitbitProfile;
};

export const Dashboard = () => {
  const [token, setToken] = useState("");
  const { userId, setUserProfile } = useUserContext();

  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      const userToken = await getUserToken(userId);
      setToken(userToken.token);

      if (token) {
        const userDetails = await getUserProfile({ userId, token });
        setUserProfile(userDetails.user);
      }
    };

    if (userId) {
      fetchUserData(userId as string).catch(console.error);
    }
  }, [token]);

  return (
    <div className="dashboard" style={{ padding: "16px" }}>
      <h2>Dashboard</h2>
    </div>
  );
};
