import { Drawer as MDrawer, Button, MediaQuery, Center } from "@mantine/core";
import { useState } from "react";
import { AlignJustified } from "tabler-icons-react";
import { useUserContext } from "@/context/user-context";
import { UserProfile } from "@/components/cards/UserProfile";
import { FitbitProfile } from "@giveback007/fitbit-api";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const Drawer = ({ children }: { children?: JSX.Element[] }) => {
  const [opened, setOpened] = useState(false);
  const { userProfile } = useUserContext();
  const [localUserProfile] = useLocalStorage<FitbitProfile>("userProfile");
  const user = userProfile ? userProfile : localUserProfile;

  const zeroPadding = {
    padding: "0",
  };

  return (
    <div className="drawer">
      <MDrawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Navbar"
        padding="md"
        size="md"
        transition="slide-right"
        transitionDuration={250}
        transitionTimingFunction="ease"
      >
        <Center
          sx={(theme) => ({
            flexGrow: 1,
            marginBottom: "10px",
            borderBottom: `1px solid ${theme.colors.dark[5]}`,
          })}
        >
          {}
        </Center>
        {user && (
          <UserProfile avatar={user.avatar150} fullName={user.fullName} />
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
