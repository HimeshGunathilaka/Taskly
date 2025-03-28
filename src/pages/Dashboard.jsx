import { useEffect, useState } from "react";
import { usePublicContext } from "../context/Context";
import DashboardAnalyticsCard from "../components/DashboardAnalyticsCard";
import Task from "../components/Task";
import Loading from "../components/Loading";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novembver",
  "December",
];

const Dashboard = () => {
  const {
    tasks,
    user,
    keyword,
    setKeyword,
    dueTodayTasks,
    pendingTasks,
    overdueTasks,
    completedTasks,
    setOpenNotifications,
  } = usePublicContext();

  const [priorityType, setPriorityType] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusType, setStatusType] = useState("All");
  const [categoryType, setCategoryType] = useState("All");
  const currentDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  useEffect(() => {
    const filteredByKeyword = tasks?.filter((task) =>
      keyword === ""
        ? task
        : task?.title
            .toString()
            .toLowerCase()
            .includes(keyword?.toString().toLowerCase())
    );

    const filteredByCategory = filteredByKeyword.filter((task) =>
      categoryType === "All" ? task : task?.category === categoryType
    );

    const filteredByStatus = filteredByCategory.filter((task) =>
      statusType === "All" ? task : task?.status === statusType
    );

    const filteredByAll = filteredByStatus?.filter((task) =>
      priorityType === "All" ? task : priorityType === task?.priority
    );

    setFilteredTasks(filteredByAll);
  }, [priorityType, keyword, setKeyword, tasks, categoryType, statusType]);

  return (
    <div className="container-fluid dashboard-container w-100 h-100 p-0 m-0">
      <div className="dashboard-header d-flex flex-row flex-wrap gap-3 row-gap-4 align-items-center justify-content-between p-3">
        <div className="d-flex flex-column">
          <h1 className="dashboard-title">Welcome {user?.username}!</h1>
          <p>
            Today is {weekdays[new Date().getDay()]}, {new Date().getDate()}
            {new Date().getDate() === 1
              ? "st"
              : new Date().getDate() === 2
              ? "nd"
              : new Date().getDate() === 3
              ? "rd"
              : "th"}{" "}
            {months[new Date().getMonth()]} {new Date().getFullYear()}
          </p>
        </div>
        <div className="d-flex flex-row align-items-center gap-2">
          {dueTodayTasks?.length > 0 && (
            <button
              className="notifications-button m-0 me-3 rounded-circle"
              onClick={() => setOpenNotifications(true)}
            >
              <i className="bi bi-bell"></i>
              <div className="notifications-active-indicator rounded-pill"></div>
            </button>
          )}
          <div className="flex-row dashboard-user-container">
            <img
              src="/images/8104.webp"
              className="rounded-circle img-fluid"
              alt="user-avatar"
              loading="lazy"
            />
            <div className="flex-grow-1 d-flex flex-column align-items-start ms-2">
              <p className="dashboard-user-name">{user?.username}</p>
              <p className="dashboard-user-position">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-content w-100 d-flex flex-column">
        <div className="w-100 m-0 row-gap-3 gap-3 p-3 d-flex flex-row flex-wrap">
          <DashboardAnalyticsCard
            item={{
              type: "Due Today",
              count: dueTodayTasks.length,
              title: "Total number of due today tasks",
            }}
          />
          <DashboardAnalyticsCard
            item={{
              type: "Pending",
              count: pendingTasks.length,
              title: "Total number of pending tasks",
            }}
          />
          <DashboardAnalyticsCard
            item={{
              type: "Overdue",
              count: overdueTasks.length,
              title: "Total number of overdue tasks",
            }}
          />
          <DashboardAnalyticsCard
            item={{
              type: "Completed",
              count: completedTasks.length,
              title: "Total number of completed tasks",
            }}
          />
        </div>
        {tasks?.length > 0 ? (
          <div className="d-flex flex-column dashboard-table-card-wrapper">
            <div className="w-100 d-flex flex-column align-items-start my-4 px-3 row-gap-2">
              <h1 className="dashboard-table-header">Tasks due today</h1>
              <p className="m-0 dashboard-table-description">
                Stay on track! These tasks are due today, complete them to keep
                your productivity high.
              </p>
              <div className="mt-4 d-flex flex-row align-items-center justify-content-between flex-wrap mb-3 w-100 row-gap-2 gap-2">
                <div className="d-flex flex-row search-bar-holder align-items-center px-2 position-relative flex-grow-1">
                  <i className="bi bi-search search-icon me-2"></i>
                  <input
                    type="text"
                    className="m-0"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="dashboard-filters-container d-flex flex-row flex-wrap gap-2 row-gap-2 flex-grow-1">
                  <select
                    onChange={(e) => setPriorityType(e.target.value)}
                    className="task-priority-filter px-2 flex-grow-1"
                  >
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <select
                    onChange={(e) => setStatusType(e.target.value)}
                    className="task-status-filter px-2 flex-grow-1"
                  >
                    <option value="All">All</option>
                    <option value="To do">To do</option>
                    <option value="In progress">In progress</option>
                    {/* <option value="Completed">Completed</option> */}
                  </select>
                  <select
                    onChange={(e) => setCategoryType(e.target.value)}
                    className="task-category-filter px-2 flex-grow-1"
                  >
                    <option value="All">All</option>
                    <option value="Work">Work</option>
                    <option value="Finance">Finance</option>
                    <option value="Leisure">Leisure</option>
                    <option value="Health">Health</option>
                    <option value="Personal">Personal</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row row-gap-4 m-0 p-0 dashboard-due-tasks-container pb-3">
              {filteredTasks.length > 0 ? (
                filteredTasks?.filter(
                  (task) =>
                    task?.status !== "Completed" && task?.date === currentDate
                ).length > 0 ? (
                  filteredTasks
                    ?.filter(
                      (task) =>
                        task?.status !== "Completed" &&
                        task?.date === currentDate
                    )
                    .map((task, index) => {
                      return <Task key={index} task={task} />;
                    })
                ) : (
                  <Loading title={"tasks"} />
                )
              ) : (
                <Loading title={"tasks"} />
              )}
            </div>
            {/* <TasksTable /> */}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
