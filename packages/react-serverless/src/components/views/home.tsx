import { Button } from "@mantine/core";

export const Home = () => {
  return (
    <div className="flex flex-col" style={{ padding: "16px" }}>
      <h2>Welcome to your Fitbit Stats app</h2>
      <a href="/.netlify/functions/auth">
        <Button style={{ marginTop: "10px" }}>Login</Button>
      </a>
    </div>
  );
};
