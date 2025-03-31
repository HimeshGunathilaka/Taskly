import Loading from "../components/Loading";
import NotificationCard from "../components/NotifiactionCard";
import { usePublicContext } from "../context/Context";

const Notifications = () => {
  const {
    dueTodayTasks,
    setNavigation,
    previousNavigation,
    setOpenNotifications,
  } = usePublicContext();
  return (
    <div className="container-fluid notifications-container w-100 h-100 m-0">
      <div className="d-flex flex-column row-gap-2 notifications-popup bg-white p-4">
        <div className="d-flex flex-row w-100 justify-content-between align-items-center mb-2">
          <h1>Notifications</h1>
          <button
            className="close-btn ms-auto"
            onClick={() => {
              setNavigation(previousNavigation);
              setOpenNotifications(false);
            }}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        {dueTodayTasks?.length > 0 ? (
          <NotificationCard
            notification={{
              message: `You have ${dueTodayTasks?.length} tasks due today. Stay on track by completing them before the day ends.`,
            }}
          />
        ) : (
          <Loading title={"notifications"} />
        )}
      </div>
    </div>
  );
};

export default Notifications;
