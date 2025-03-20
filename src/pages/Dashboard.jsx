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
  const { list } = usePublicContext();
  const [pendingTasks, setPendingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const isOverdue = (currentDate, statedDate) => {
    const formatDate = (dateStr) => {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    let date1 = formatDate(currentDate);
    let date2 = formatDate(statedDate);

    console.log(currentDate);
    console.log(statedDate);

    if (date1 < date2) {
      console.log(`${currentDate} is less than ${statedDate}`);
      return false;
    } else if (date1 > date2) {
      console.log(`${currentDate} is greater than ${statedDate}`);
      return true;
    } else {
      console.log(`Both dates are equal`);
      return false;
    }
  };

  useEffect(() => {
    setPendingTasks(
      list?.filter(
        (task) => task?.status === "To do" || task?.status === "In progress"
      )
    );

    setCompletedTasks(list?.filter((task) => task?.status === "Completed"));

    setOverdueTasks(
      list?.filter(
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
  }, [list]);

  return (
    <div className="container-fluid dashboard-container w-100 h-100 p-0">
      <div className="h-auto w-100 dashboard-wrapper d-flex flex-column p-0">
        <div className="dashboard-header d-flex flex-row align-items-center justify-content-between p-3">
          <div className="d-flex flex-column">
            <h1 className="dashboard-title">Welcome Meaghan Lownest!</h1>
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
              <p className="dashboard-user-name">Meaghan Lownest</p>
              <p className="dashboard-user-position">Admin</p>
            </div>
          </div>
        </div>
        <div className="dashboard-content p-3">
          <div className="row w-100 p-0 row-gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
