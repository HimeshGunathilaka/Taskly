import { useEffect, useState } from "react";
import { usePublicContext } from "../context/Context";
import Loading from "./Loading";

const TasksTable = () => {
  const { tasks, refreshTasks, keyword, setKeyword } = usePublicContext();
  const [priorityType, setPriorityType] = useState("All");
  const [categoryType, setCategoryType] = useState("All");
  const [dueType, setDueType] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusType, setStatusType] = useState("All");
  const currentDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  useEffect(() => {
    refreshTasks();
  }, []);

  const isOverdue = (currentDate, statedDate) => {
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    const current = formatDate(currentDate);
    const stated = formatDate(statedDate);

    return current > stated;
  };

  const getTimeRemaining = (currentDate, dueDate) => {
    const current = new Date(currentDate);
    const due = new Date(dueDate);

    if (current >= due) {
      return { years: 0, months: 0, days: 0 };
    }

    let years = due.getFullYear() - current.getFullYear();
    let months = due.getMonth() - current.getMonth();
    let days = due.getDate() - current.getDate();

    if (days < 0) {
      months--;
      const tempDate = new Date(due.getFullYear(), due.getMonth(), 0);
      days += tempDate.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years: years, months: months, days: days };
  };

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

    const filteredByDueType = filteredByStatus.filter((task) =>
      dueType === "All"
        ? task
        : dueType === "Overdue"
        ? isOverdue(currentDate, task?.date)
        : dueType === "Due_Today"
        ? task?.date === currentDate
        : !isOverdue(currentDate, task?.date) && task?.status !== "Completed"
    );

    const filteredByAll = filteredByDueType.filter((task) =>
      priorityType === "All" ? task : priorityType === task?.priority
    );

    // Sorting logic
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const statusOrder = { Pending: 1, Overdue: 2, Completed: 3 };

    const sortedTasks = [...filteredByAll].sort((a, b) => {
      // Completed tasks should always be last
      if (a.status === "Completed" && b.status !== "Completed") return 1;
      if (b.status === "Completed" && a.status !== "Completed") return -1;

      // Due Today should come first
      const isADueToday = a.date === currentDate;
      const isBDueToday = b.date === currentDate;

      if (isADueToday && !isBDueToday) return -1;
      if (!isADueToday && isBDueToday) return 1;

      // Sort by priority
      const priorityA = priorityOrder[a.priority] || 4;
      const priorityB = priorityOrder[b.priority] || 4;
      if (priorityA !== priorityB) return priorityA - priorityB;

      // Then sort by status
      const statusA = statusOrder[a.status] || 4;
      const statusB = statusOrder[b.status] || 4;
      return statusA - statusB;
    });

    setFilteredTasks(sortedTasks);
  }, [
    priorityType,
    keyword,
    categoryType,
    statusType,
    tasks,
    dueType,
    currentDate,
  ]);
  return (
    <div className="px-3 pb-3 d-flex flex-column">
      <div className="w-100 py-3 px-0 d-flex flex-row dashboard-tasks-header tasks-header row-gap-2 mb-3 justify-content-between flex-wrap">
        <div className="d-flex flex-row search-bar-holder align-items-center px-2 position-relative">
          <i className="bi bi-search search-icon me-2"></i>
          <input
            type="text"
            className="m-0"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <span className="d-flex flex-row flex-wrap gap-2 row-gap-2">
          <select
            onChange={(e) => setDueType(e.target.value)}
            className="task-status-filter px-2"
          >
            <option value="All">All</option>
            <option value="Overdue">Overdue</option>
            <option value="Due_Today">Due Today</option>
            <option value="Pending">Pending</option>
          </select>
          <select
            onChange={(e) => setStatusType(e.target.value)}
            className="task-status-filter px-2"
          >
            <option value="All">All</option>
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            onChange={(e) => setCategoryType(e.target.value)}
            className="task-category-filter px-2"
          >
            <option value="All">All</option>
            <option value="Work">Work</option>
            <option value="Finance">Finance</option>
            <option value="Leisure">Leisure</option>
            <option value="Health">Health</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
          </select>
          <select
            onChange={(e) => setPriorityType(e.target.value)}
            className="task-priority-filter px-2"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </span>
      </div>
      <div className="dashboard-table-wrapper w-100">
        {filteredTasks?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Due status</th>
                <th>Progress Status</th>
                <th>Priority</th>
                <th>Category</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks?.map((task, index) => {
                return (
                  <tr key={index}>
                    <td datalabel="Task">{task?.title}</td>
                    <td datalabel="Due Status">
                      {task?.status !== "Completed" && (
                        <span
                          className={`px-2 py-1 rounded-pill task-overdue-status ${
                            isOverdue(currentDate, task?.date)
                              ? "overdue"
                              : task?.date === currentDate
                              ? "due-today"
                              : ""
                          } me-2`}
                        >
                          <>
                            {isOverdue(currentDate, task?.date)
                              ? "Overdue"
                              : task?.date === currentDate
                              ? "Due today"
                              : `${`${
                                  getTimeRemaining(currentDate, task?.date)
                                    ?.years > 0
                                    ? `${
                                        getTimeRemaining(
                                          currentDate,
                                          task?.date
                                        )?.years
                                      } years${
                                        getTimeRemaining(
                                          currentDate,
                                          task?.date
                                        )?.months > 0 && `,`
                                      }`
                                    : ``
                                }
                ${
                  getTimeRemaining(currentDate, task?.date)?.months > 0
                    ? `${
                        getTimeRemaining(currentDate, task?.date)?.months
                      } months${
                        getTimeRemaining(currentDate, task?.date)?.days > 0 &&
                        ` and`
                      } `
                    : ``
                }
              
             ${
               getTimeRemaining(currentDate, task?.date)?.days
             } days`} remaining`}
                          </>
                        </span>
                      )}
                    </td>
                    <td datalabel="Progress Status">
                      <span
                        className={`${
                          task?.status === "Completed" && `completed`
                        } px-2 py-1 rounded-pill task-card-status me-2`}
                      >
                        {task?.status}
                      </span>
                    </td>
                    <td datalabel="Priority">
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
                    <td datalabel="Category">
                      <span className="px-2 py-1 rounded-pill task-card-category">
                        {task?.category}
                      </span>
                    </td>
                    <td datalabel="Date">{task?.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Loading title={"tasks"} />
        )}
      </div>
    </div>
  );
};

export default TasksTable;
