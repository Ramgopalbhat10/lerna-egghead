import { useSearch, MakeGenerics, useNavigate } from "@tanstack/react-location";
import { useEffect, useState } from "react";

type MyLocationGenerics = MakeGenerics<{
  Search: {
    userId?: string;
  };
}>;

export function Login() {
  const navigate = useNavigate();
  const search = useSearch<MyLocationGenerics>();

  useEffect(() => {
    if (search.userId) {
      sessionStorage.setItem("userId", search.userId as string);
      navigate({ to: "/dashboard", replace: true });
    }
  }, []);

  return (
    <div>
      <a href="/.netlify/functions/auth">
        <button>Login</button>
      </a>
      {/* <button onClick={getAuthInfo}>Login</button> */}
    </div>
  );
}
