import { Card, CardSection, Image, Text } from "@mantine/core";

type TopBadgeProps = {
  badgeImage: string;
  badgeGradientStartColor: string;
  badgeGradientEndColor: string;
  name: string;
  shortName: string;
  earnedMessage: string;
  description: string;
};

export const TopBadge = ({
  badgeImage,
  badgeGradientStartColor,
  badgeGradientEndColor,
  name,
  shortName,
  earnedMessage,
  description,
}: TopBadgeProps) => {
  return (
    <Card
      p="xl"
      shadow="sm"
      className="badge-card"
      style={{ maxWidth: "450px" }}
    >
      <CardSection
        style={{ padding: "10px", marginBottom: "10px" }}
        sx={(_theme) => ({
          backgroundImage: `linear-gradient(45deg, #${badgeGradientStartColor}, #${badgeGradientEndColor})`,
          display: "flex",
          alignItems: "center",
        })}
      >
        <Image
          className="badge-image"
          src={badgeImage}
          alt="share image"
          fit="contain"
          width="initial"
        />
        <div style={{ marginLeft: "16px", color: "white" }}>
          <h2>{shortName}</h2>
        </div>
        <p className="badge-star">🌟</p>
      </CardSection>
      <Text weight={500} size="lg">
        {name}
      </Text>
      <Text size="sm">{description}</Text>
    </Card>
  );
};
