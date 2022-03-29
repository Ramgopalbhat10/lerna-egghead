import { Router, Outlet } from "@tanstack/react-location";
import { route, location } from "./router/route";

const App: React.FC = () => {
  return (
    <Router routes={route} location={location}>
      <Outlet />
    </Router>
  );
};

export default App;
