import Loading from "../components/Loading";
import NotificationCard from "../components/NotifiactionCard";
import { usePublicContext } from "../context/Context";

const Notifications = () => {
  const { dueTodayTasks } = usePublicContext();
  return (
    <div className="container-fluid notifications-container w-100 h-100 p-3 m-0">
      <div className="d-flex flex-column row-gap-2">
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
