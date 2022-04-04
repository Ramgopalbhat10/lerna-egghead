import { Router, Outlet } from "@tanstack/react-location";
import { MantineProvider, AppShell } from "@mantine/core";
import { route, location } from "@/router/route";
import { Footer, Header } from "@/components";
import { UserProvider } from "@/context/user-context";

const App: React.FC = () => {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
      <UserProvider>
        <Router routes={route} location={location}>
          <AppShell
            padding="md"
            header={<Header />}
            footer={<Footer />}
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Outlet />
          </AppShell>
        </Router>
      </UserProvider>
    </MantineProvider>
  );
};

export default App;
