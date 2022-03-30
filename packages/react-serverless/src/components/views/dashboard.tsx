import { useEffect, useState } from "react";
import { Center, Paper, Avatar } from "@mantine/core";
import { FitbitProfile } from "@giveback007/fitbit-api/dist";
import { IUserTokenResponse } from "@t/index";
import { Navbar } from "@/components";

type IUserDetails = {
  user: FitbitProfile;
};

export const Dashboard = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<FitbitProfile | undefined>();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async (userId: string | null) => {
      const tokenData = await fetch("/.netlify/functions/getUserInfo", {
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      });
      const userToken: IUserTokenResponse = await tokenData.json();
      setToken(userToken.token);

      if (token) {
        const userData = await fetch(
          `https://api.fitbit.com/1/user/${userId}/profile.json`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userDetails: IUserDetails = await userData.json();
        setUser(userDetails.user);
        console.log("user data -> ", userDetails.user);
      }
    };

    if (userId) {
      fetchUserData(userId).catch(console.error);
    }
  }, [token]);

  return (
    <div className="dashboard">
      <Navbar>
        <Center style={{ fontWeight: 500, fontSize: "20px" }}>Navbar</Center>
        <Center
          sx={(theme) => ({
            flexGrow: 1,
            marginBottom: "10px",
            borderBottom: `1px solid ${theme.colors.dark[5]}`,
          })}
        >
          {}
        </Center>
        {(user as FitbitProfile) && (
          <Paper
            radius="sm"
            p="md"
            sx={(theme) => ({
              "&:hover": {
                backgroundColor: theme.colors.dark[8],
                cursor: "pointer",
              },
            })}
          >
            <div className="profile-card">
              <Avatar src={user?.avatar150} alt="avatar 150" radius="xl" />
              <p style={{ marginLeft: "14px", flexGrow: 1 }}>
                {user?.fullName}
              </p>
            </div>
          </Paper>
        )}
      </Navbar>
    </div>
  );
};
