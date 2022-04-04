import { Paper, Avatar } from "@mantine/core";
import { ArrowNarrowRight } from "tabler-icons-react";

export const UserProfile = ({
  avatar,
  fullName,
}: {
  avatar: string;
  fullName: string;
}) => {
  return (
    <Paper
      radius="sm"
      p="md"
      sx={(theme) => ({
        "&:hover": {
          backgroundColor: theme.colors.dark[8],
          cursor: "pointer",
        },
      })}
    >
      <div className="profile-card">
        <Avatar src={avatar} alt="avatar 150" radius="xl" />
        <p style={{ marginLeft: "14px", flexGrow: 1 }}>{fullName}</p>
        <ArrowNarrowRight size={20} strokeWidth={1.5} color={"#c1c2c5"} />
      </div>
    </Paper>
  );
};
