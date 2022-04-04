import { Navbar as MNavbar } from "@mantine/core";

export const Navbar = ({ children }: { children: JSX.Element[] }) => {
  return (
    <MNavbar width={{ base: 300 }} p="xs" style={{ padding: "16px" }}>
      {children}
    </MNavbar>
  );
};
