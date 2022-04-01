import { Drawer as MDrawer, Button, MediaQuery, Center } from "@mantine/core";
import { useState } from "react";
import { AlignJustified } from "tabler-icons-react";
import { useUserContext } from "@/context/user-context";
import { UserProfile } from "../cards/UserProfile";

export const Drawer = ({ children }: { children?: JSX.Element[] }) => {
  const [opened, setOpened] = useState(false);
  const { userProfile } = useUserContext();

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
        {userProfile && (
          <UserProfile
            avatar={userProfile.avatar150}
            fullName={userProfile.fullName}
          />
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
