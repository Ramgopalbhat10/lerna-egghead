import { Header as MHeader, Button } from "@mantine/core";
import fitbitLogo from "@assets/fitbit-icon.svg";

export const Header = () => {
  const userId = sessionStorage.getItem("userId");

  return (
    <MHeader height={75} p="md">
      <img src={fitbitLogo} alt="Fitbit logo" style={{ width: "30px" }} />
      {!userId && (
        <a href="/.netlify/functions/auth">
          <Button>Login</Button>
        </a>
      )}
    </MHeader>
  );
};
