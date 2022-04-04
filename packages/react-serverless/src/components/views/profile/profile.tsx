import { useUserContext } from "@/context/user-context";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FitbitProfile } from "@giveback007/fitbit-api";
import {
  Card,
  Center,
  Divider,
  Image,
  Text,
  Button,
  Grid,
} from "@mantine/core";

export const Profile = () => {
  const { userProfile } = useUserContext();
  const [localUserProfile] = useLocalStorage<FitbitProfile>("userProfile");

  const user = userProfile ? userProfile : localUserProfile;

  return (
    <Center className="profile" style={{ padding: "16px" }}>
      <h2 style={{ marginBottom: "10px" }}>Profile</h2>
      {user ? (
        <Card style={{ maxWidth: "450px" }}>
          <Card.Section style={{ marginBottom: "10px" }}>
            <Image src={user.avatar640} alt="profile avatar" height={320} />
          </Card.Section>
          <Text weight={500} size="xl">
            {user.fullName}, {user.age}
          </Text>
          <Divider my="sm" />
          <Text weight={500} size="md">
            Personal Details
          </Text>
          <Grid>
            <Grid.Col span={5}>
              <Text size="sm">DOB</Text>
              <Text size="sm">Weight</Text>
              <Text size="sm">Height</Text>
              <Text size="sm">Gender</Text>
            </Grid.Col>
            <Grid.Col span={7}>
              <Text size="sm">{new Date(user.dateOfBirth).toDateString()}</Text>
              <Text size="sm">
                {user.weight} {user.weightUnit === "METRIC" ? "kg" : "lb"}
              </Text>
              <Text size="sm">{user.height.toFixed(2)} cm</Text>
              <Text size="sm">{user.gender.toLowerCase()}</Text>
            </Grid.Col>
          </Grid>
          <Divider my="sm" />
          <Text weight={500} size="md">
            Others
          </Text>
          <Grid>
            <Grid.Col span={5}>
              <Text size="sm">Timezone</Text>
              <Text size="sm">Member since</Text>
            </Grid.Col>
            <Grid.Col span={7}>
              <Text size="sm">{user.timezone}</Text>
              <Text size="sm">{new Date(user.memberSince).toDateString()}</Text>
            </Grid.Col>
          </Grid>
        </Card>
      ) : (
        <a href="/.netlify/functions/auth">
          <Button>Login</Button>
        </a>
      )}
    </Center>
  );
};
