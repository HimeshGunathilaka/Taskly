import { usePublicContext } from "../context/Context";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Tasks from "../pages/Tasks";

const Body = () => {
  const { navigation } = usePublicContext();
  return (
    <div className="body-container">
      {navigation === "/" ? (
        <Dashboard />
      ) : navigation === "/to-do" ? (
        <Tasks />
      ) : navigation === "/settings" ? (
        <Settings />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Body;
