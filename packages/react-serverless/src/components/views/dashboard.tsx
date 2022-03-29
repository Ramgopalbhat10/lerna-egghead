import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchUserToken = async (userId: string | null) => {
      const data = await fetch("/.netlify/functions/getUserInfo", {
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      });
      const json = await data.json();
      setToken(json.token);
    };

    if (sessionStorage.getItem("userId")) {
      const userId = sessionStorage.getItem("userId");
      fetchUserToken(userId).catch(console.error);
    }
  }, [token]);

  return (
    <>
      <h2>Dashboard</h2>
      {token && <p>{token}</p>}
    </>
  );
};
