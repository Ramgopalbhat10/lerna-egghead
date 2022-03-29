import { Header as MHeader, Button } from "@mantine/core";
import fitbitLogo from "@assets/fitbit-icon.svg";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <MHeader height={75} p="md">
      <img src={fitbitLogo} alt="Fitbit logo" style={{ width: "30px" }} />
      {!isLoggedIn && (
        <a href="/.netlify/functions/auth">
          <Button>Login</Button>
        </a>
      )}
    </MHeader>
  );
};
