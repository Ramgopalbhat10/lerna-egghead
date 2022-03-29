import { useSearch, MakeGenerics, useNavigate } from "@tanstack/react-location";
import { useEffect, useState } from "react";

type MyLocationGenerics = MakeGenerics<{
  Search: {
    userId?: string;
  };
}>;

export const Dashboard = () => {
  const navigate = useNavigate();
  const search = useSearch<MyLocationGenerics>();
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

    if (search.userId) {
      sessionStorage.setItem("userId", search.userId as string);
      navigate({ to: "/dashboard", replace: true });
    } else if (sessionStorage.getItem("userId")) {
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
