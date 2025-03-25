import { useEffect, useState } from "react";
import { usePublicContext } from "../context/Context";
import DashboardAnalyticsCard from "../components/DashboardAnalyticsCard";

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
  const { tasks, refreshTasks } = usePublicContext();
  const [pendingTasks, setPendingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    refreshTasks();
  }, []);

  const isOverdue = (currentDate, statedDate) => {
    const formatDate = (dateStr) => {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    let date1 = formatDate(currentDate);
    let date2 = formatDate(statedDate);

    if (date1 < date2) {
      // console.log(`${currentDate} is less than ${statedDate}`);
      return false;
    } else if (date1 > date2) {
      // console.log(`${currentDate} is greater than ${statedDate}`);
      return true;
    } else {
      // console.log(`Both dates are equal`);
      return false;
    }
  };

  useEffect(() => {
    setPendingTasks(
      tasks?.filter(
        (task) => task?.status === "To do" || task?.status === "In progress"
      )
    );

    setCompletedTasks(tasks?.filter((task) => task?.status === "Completed"));

    setOverdueTasks(
      tasks?.filter(
        (task) =>
          isOverdue(
            new Date().getFullYear() +
              "-" +
              new Date().getMonth() +
              "-" +
              new Date().getDate(),
            task?.date
          ) && task
      )
    );
  }, [tasks]);

  return (
    <div className="container-fluid dashboard-container w-100 h-100 p-0">
      <div className="dashboard-header d-flex flex-row flex-wrap gap-3 row-gap-4 align-items-center justify-content-between p-3">
        <div className="d-flex flex-column">
          <h1 className="dashboard-title">
            Welcome {localStorage.getItem("user-name")}!
          </h1>
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
        <div className="d-flex flex-row dashboard-user-container">
          <img src="/images/8104.jpg" className="rounded-circle img-fluid" />
          <div className="flex-grow-1 d-flex flex-column align-items-start ms-2">
            <p className="dashboard-user-name">
              {localStorage.getItem("user-name")}
            </p>
            <p className="dashboard-user-position">
              {localStorage.getItem("user-role")}
            </p>
          </div>
        </div>
      </div>
      <div className="dashboard-content d-flex flex-column">
        <div className="row w-100 m-0 row-gap-4 p-3">
          <DashboardAnalyticsCard
            item={{
              type: "Pending",
              count: pendingTasks.length,
              title: "Total number of pending tasks",
            }}
          />
          <DashboardAnalyticsCard
            item={{
              type: "Completed",
              count: completedTasks.length,
              title: "Total number of completed tasks",
            }}
          />
          <DashboardAnalyticsCard
            item={{
              type: "Overdue",
              count: overdueTasks.length,
              title: "Total number of overdue tasks",
            }}
          />
        </div>
        {tasks?.length > 0 ? (
          <div className="dashboard-table-container w-100 m-0 p-3">
            <div className="dashboard-table-wrapper w-100">
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Created on</th>
                    <th>Updated on</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks?.map((task, index) => {
                    return (
                      <tr key={index}>
                        <td>{task?.title}</td>
                        <td>
                          <span
                            className={`${
                              task?.status === "Completed" && `completed`
                            } px-2 py-1 rounded-pill task-card-status me-2`}
                          >
                            {task?.status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`${
                              task?.priority === "High"
                                ? `high`
                                : task?.priority === "Medium"
                                ? `medium`
                                : `low`
                            } px-2 py-1 rounded-pill task-card-priority me-2`}
                          >
                            {task?.priority}
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-1 rounded-pill task-card-category">
                            {task?.category}
                          </span>
                        </td>
                        <td>{task?.date}</td>
                        <td>{task?.created_at}</td>
                        <td>{task?.updated_at}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
