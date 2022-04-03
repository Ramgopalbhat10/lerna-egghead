import { useSearch, MakeGenerics, useNavigate } from "@tanstack/react-location";
import { useEffect } from "react";
import { Button } from "@mantine/core";
import { useUserContext } from "@/context/user-context";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IUserToken } from "@t/index";

type MyLocationGenerics = MakeGenerics<{
  Search: {
    userId?: string;
    token?: string;
  };
}>;

export function Login() {
  const navigate = useNavigate();
  const { userId, token } = useSearch<MyLocationGenerics>();
  const { setIsLoggedIn, setUserId } = useUserContext();
  const [_, setUserSession] = useLocalStorage<IUserToken>("userSession");
  const now = new Date();

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      setUserId(userId);
      // save details in local-storage
      setUserSession({
        userId,
        token: token as string,
        expiry: now.getTime() + 3.6e6,
      });
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
