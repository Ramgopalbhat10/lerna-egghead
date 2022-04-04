import { Avatar, Header as MHeader, Tooltip } from "@mantine/core";
import fitbitLogo from "@assets/fitbit-icon.svg";
import { Drawer } from "./Drawer";
import { useEffect } from "react";
import { useUserContext } from "@/context/user-context";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IUserToken } from "@t/index";
import { useNavigate } from "@tanstack/react-location";

export const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userProfile } = useUserContext();
  const [userSession, setUserSession] = useLocalStorage<IUserToken | {}>(
    "userSession"
  );
  const session = userSession as IUserToken;
  const now = new Date();

  useEffect(() => {
    if (session?.expiry && now.getTime() < session.expiry) {
      setIsLoggedIn(true);
    } else {
      setUserSession({});
    }
  }, [isLoggedIn]);

  return (
    <MHeader height={50} p="md">
      <div
        className="flex"
        style={{ flex: 1, justifyContent: "space-between" }}
      >
        <div className="flex">
          {isLoggedIn && <Drawer />}
          <img src={fitbitLogo} alt="Fitbit logo" style={{ width: "30px" }} />

          <p
            className="title"
            onClick={() => navigate({ to: "/", replace: true })}
            style={{ marginLeft: "10px", fontSize: "16px", fontWeight: 500 }}
          >
            FitBit Stats
          </p>
        </div>
        {isLoggedIn && (
          <Tooltip
            label={userProfile?.displayName}
            position="left"
            transition="slide-down"
            transitionDuration={300}
            transitionTimingFunction="ease"
            withArrow
          >
            <Avatar src={userProfile?.avatar} alt="avatar 150" radius="xl" />
          </Tooltip>
        )}
      </div>
    </MHeader>
  );
};
