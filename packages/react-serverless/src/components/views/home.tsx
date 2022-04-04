import { Button } from "@mantine/core";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const Home = () => {
  const [userSession] = useLocalStorage<{}>("userSession", {});

  useEffect(() => {
    console.log("Rendered Home component", userSession);
  }, []);

  return (
    <div className="flex flex-col" style={{ padding: "16px" }}>
      <h2>Welcome to your Fitbit Stats app</h2>
      <a href="/.netlify/functions/auth">
        <Button style={{ marginTop: "10px" }}>Login</Button>
      </a>
    </div>
  );
};
