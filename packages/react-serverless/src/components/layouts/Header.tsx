import { Header as MHeader } from "@mantine/core";
import fitbitLogo from "@assets/fitbit-icon.svg";

export const Header = () => {
  return (
    <MHeader height={75} p="md">
      <div className="flex">
        <img src={fitbitLogo} alt="Fitbit logo" style={{ width: "30px" }} />
        <p style={{ marginLeft: "10px", fontSize: "16px", fontWeight: 500 }}>
          FitBit Stats
        </p>
      </div>
    </MHeader>
  );
};
