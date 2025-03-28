import { useEffect, useState } from "react";
import { usePublicContext } from "../context/Context";
import Dashboard from "../pages/Dashboard";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Tasks from "../pages/Tasks";

const Body = () => {
  const { navigation } = usePublicContext();
  const [previousNavigation, setPreviousNavigation] = useState("");

  useEffect(() => {
    if (navigation !== "/notifications") {
      setPreviousNavigation(navigation);
    }
  }, [navigation]);
  return (
    <div className="body-container">
      {navigation === "/" ? (
        <Dashboard />
      ) : navigation === "/to-do" ? (
        <Tasks />
      ) : navigation === "/settings" ? (
        <Settings />
      ) : navigation === "/notifications" ? (
        <>
          <Notifications />
          {previousNavigation === "/" ? (
            <Dashboard />
          ) : previousNavigation === "/to-do" ? (
            <Tasks />
          ) : (
            <Settings />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Body;
