import { useSearch, MakeGenerics, useNavigate } from "@tanstack/react-location";
import { useEffect } from "react";
import { Button } from "@mantine/core";
import { useUserContext } from "@/context/user-context";

type MyLocationGenerics = MakeGenerics<{
  Search: {
    userId?: string;
  };
}>;

export function Login() {
  const navigate = useNavigate();
  const { userId } = useSearch<MyLocationGenerics>();
  const { setIsLoggedIn, setUserId } = useUserContext();

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      setUserId(userId);
      navigate({ to: "/dashboard", replace: true });
    }
  }, [userId]);

  return (
    <div style={{ padding: "16px" }}>
      <a href="/.netlify/functions/auth">
        <Button>Login</Button>
      </a>
    </div>
  );
}
