import { Router, Outlet } from "@tanstack/react-location";
import { route, location } from "./router/route";
import { Navbar } from "@/components";

const App: React.FC = () => {
  return (
    <Router routes={route} location={location}>
      <Navbar />
      <Outlet />
    </Router>
  );
};

export default App;
