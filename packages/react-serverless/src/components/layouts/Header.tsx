import { Header as MHeader } from "@mantine/core";
import fitbitLogo from "@assets/fitbit-icon.svg";
import { Drawer } from "./Drawer";
import { useEffect } from "react";
import { useUserContext } from "@/context/user-context";

export const Header = () => {
  const { isLoggedIn } = useUserContext();

  useEffect(() => {
    console.log("Header component rendered");
  }, []);

  return (
    <MHeader height={50} p="md">
      <div className="flex">
        {isLoggedIn && <Drawer />}
        <img src={fitbitLogo} alt="Fitbit logo" style={{ width: "30px" }} />
        <p style={{ marginLeft: "10px", fontSize: "16px", fontWeight: 500 }}>
          FitBit Stats
        </p>
      </div>
    </MHeader>
  );
};
