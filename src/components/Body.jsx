import { useEffect } from "react";
import { usePublicContext } from "../context/Context";
import Dashboard from "../pages/Dashboard";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Tasks from "../pages/Tasks";

const Body = () => {
  const {
    navigation,
    openNotifications,
    previousNavigation,
    setPreviousNavigation,
  } = usePublicContext();

  useEffect(() => {
    console.log(navigation);
  }, [navigation]);

  useEffect(() => {
    if (navigation !== "/notifications") {
      setPreviousNavigation(navigation);
    }
  }, [navigation, setPreviousNavigation]);
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
          {openNotifications && <Notifications />}
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
