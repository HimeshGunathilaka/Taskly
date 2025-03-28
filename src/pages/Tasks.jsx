import { useEffect, useState } from "react";
import Task from "../components/Task";
import { usePublicContext } from "../context/Context";
import Loading from "../components/Loading";
import Popup from "../components/Popup";
import CreateTaskForm from "../components/CreateTaskForm";

const Tasks = () => {
  const {
    keyword,
    setKeyword,
    tasks,
    openPopup,
    setOpenPopup,
    setPopupTitle,
    popupTitle,
  } = usePublicContext();
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

  const isOverdue = (currentDate, statedDate) => {
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    const current = formatDate(currentDate);
    const stated = formatDate(statedDate);

    return current > stated;
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
    <>
      {openPopup && (
        <Popup onClose={() => setOpenPopup(false)} title={popupTitle}>
          <CreateTaskForm />
        </Popup>
      )}
      <div className="container-fluid tasks-container w-100 h-100 p-0 d-flex flex-column">
        <div className="w-100 p-3 d-flex flex-row tasks-header row-gap-2 mb-3 justify-content-between flex-wrap gap-2">
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
          <span className="d-flex flex-row flex-wrap gap-2 row-gap-2 flex-grow-1 tasks-fliters-container justify-content-end">
            <select
              onChange={(e) => setDueType(e.target.value)}
              className="task-status-filter px-2 flex-grow-1"
            >
              <option value="All">All</option>
              <option value="Overdue">Overdue</option>
              <option value="Due_Today">Due Today</option>
              <option value="Pending">Pending</option>
            </select>
            <select
              onChange={(e) => setStatusType(e.target.value)}
              className="task-status-filter px-2 flex-grow-1"
            >
              <option value="All">All</option>
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
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
            <select
              onChange={(e) => setPriorityType(e.target.value)}
              className="task-priority-filter px-2 flex-grow-1"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              className="px-3 normal-btn create-task-btn"
              onClick={() => {
                setOpenPopup(true);
                setPopupTitle("Create a new task");
              }}
            >
              Create
            </button>
          </span>
        </div>
        {filteredTasks?.length ? (
          <div className="tasks-wrapper row row-gap-4 m-0 p-0 pb-3">
            {filteredTasks?.map((task, index) => {
              return <Task key={index} task={task} />;
            })}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Tasks;
