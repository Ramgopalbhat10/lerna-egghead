import {
  Drawer as MDrawer,
  Button,
  MediaQuery,
  Center,
  Divider,
} from "@mantine/core";
import { useState } from "react";
import { AlignJustified, Dashboard, Id } from "tabler-icons-react";
import { useUserContext } from "@/context/user-context";
import { UserProfile } from "@/components/index";
import { FitbitProfile } from "@giveback007/fitbit-api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useStyles } from "./styles";
import { useNavigate } from "@tanstack/react-location";

export const Drawer = ({ children }: { children?: JSX.Element[] }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const [opened, setOpened] = useState(false);
  const { userProfile } = useUserContext();
  const [localUserProfile] = useLocalStorage<FitbitProfile>("userProfile");
  const user = userProfile ? userProfile : localUserProfile;

  const zeroPadding = {
    padding: "0",
  };

  const collections = [
    { icon: <Dashboard />, label: "dashboard" },
    { icon: <Id />, label: "profile" },
  ];

  const quickLinks = collections.map((link) => (
    <a
      onClick={() => {
        navigate({ to: `/${link.label}`, replace: true });
        setOpened(false);
      }}
      key={link.label}
      className={classes.quickLink}
    >
      <span style={{ marginRight: 9, fontSize: 16 }}>{link.icon}</span>{" "}
      {link.label}
    </a>
  ));

  return (
    <div className="drawer">
      <MDrawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Quick Links"
        padding="md"
        size="md"
        transition="slide-right"
        transitionDuration={250}
        transitionTimingFunction="ease"
      >
        <Divider size="xs" style={{ marginBottom: "10px" }} />
        <div className={classes.section}>
          <div className={classes.quickLinks}>{quickLinks}</div>
        </div>
        <Divider size="xs" style={{ marginBottom: "10px" }} />
        {user && (
          <UserProfile avatar={user?.avatar150} fullName={user?.fullName} />
        )}
      </MDrawer>
      <MediaQuery smallerThan="md" styles={zeroPadding}>
        <Button
          onClick={() => setOpened(true)}
          variant="subtle"
          size="xs"
          style={{ marginRight: "10px" }}
        >
          <AlignJustified size={24} strokeWidth={1.5} color={"#c1c2c5"} />
        </Button>
      </MediaQuery>
    </div>
  );
};
