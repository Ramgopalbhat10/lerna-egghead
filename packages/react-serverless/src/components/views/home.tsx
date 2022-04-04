import { Button } from "@mantine/core";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useUserContext } from "@/context/user-context";

export const Home = () => {
  const [_userSession] = useLocalStorage<{}>("userSession", {});
  const { isLoggedIn } = useUserContext();

  useEffect(() => {
    console.log("Rendered Home component");
  }, []);

  return (
    <div className="flex flex-col" style={{ padding: "16px" }}>
      <h2>Welcome to your Fitbit Stats app</h2>
      {!isLoggedIn && (
        <a href="/.netlify/functions/auth">
          <Button style={{ marginTop: "10px" }}>Login</Button>
        </a>
      )}
    </div>
  );
};
