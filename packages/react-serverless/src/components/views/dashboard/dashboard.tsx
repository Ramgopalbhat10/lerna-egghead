import { useEffect, useState } from "react";
import { useUserContext } from "@/context/user-context";
import { getUserProfile } from "@/api/getUserData";
import { Center } from "@mantine/core";
import { TopBadge } from "@/components/cards/TopBadge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IUserToken } from "@t/index";
import { FitbitProfile } from "@giveback007/fitbit-api";

export const Dashboard = () => {
  const [token, setToken] = useState("");
  const { userId, setUserId, setUserProfile, userProfile } = useUserContext();
  const [userSession, setUserSession] = useLocalStorage<IUserToken | {}>(
    "userSession"
  );
  const session = userSession as IUserToken;
  const [_, storeUserProfile, removeUserProfile] =
    useLocalStorage<FitbitProfile>("userProfile");

  const topBadges = userProfile?.topBadges;
  const now = new Date();

  useEffect(() => {
    if (session?.expiry && now.getTime() < session.expiry) {
      setToken(session.token);
      setUserId(session.userId);
    } else {
      setUserSession({});
      removeUserProfile("userProfile");
    }
    const fetchUserData = async (userId: string) => {
      if (token) {
        const userDetails = await getUserProfile({ userId, token });
        setUserProfile(userDetails.user);
        storeUserProfile(userDetails.user);
      }
    };

    if (userId) {
      fetchUserData(userId as string).catch(console.error);
    }
  }, [token]);

  return (
    <Center className="dashboard" style={{ padding: "16px" }}>
      <h3 style={{ marginBottom: "10px" }}>Top Badges</h3>
      <div className="top-badges">
        {topBadges?.map((badge) => (
          <TopBadge
            badgeImage={badge.image125px}
            badgeGradientStartColor={badge.badgeGradientStartColor}
            badgeGradientEndColor={badge.badgeGradientEndColor}
            name={badge.description}
            shortName={badge.shortName}
            earnedMessage={badge.earnedMessage}
            description={badge.marketingDescription}
            key={badge.encodedId}
          />
        ))}
      </div>
    </Center>
  );
};
