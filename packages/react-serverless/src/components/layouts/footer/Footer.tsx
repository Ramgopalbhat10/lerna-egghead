import { Footer as MFooter, Center } from "@mantine/core";

export const Footer = () => {
  return (
    <MFooter height={45} p="xs">
      <Center style={{ fontSize: "14px" }}>
        Made with React, Mantine and Netlify
      </Center>
    </MFooter>
  );
};
