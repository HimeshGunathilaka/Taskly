import { useEffect, useState } from "react";
import UpdateTask from "./UpdateTask";
import { usePublicContext } from "../context/Context";
import service from "../services/service";

const Task = ({ task }) => {
  const [hover, setHover] = useState(false);
  const {
    setSelectedTask,
    refreshTasks,
    alert,
    openTaskActions,
    setOpenTaskActions,
    selectedTask,
  } = usePublicContext();
  const currentDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  useEffect(() => {
    setOpenTaskActions(false);
  }, []);

  const isOverdue = (currentDate, statedDate) => {
    const formatDate = (dateStr) => {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    let date1 = formatDate(currentDate);
    let date2 = formatDate(statedDate);

    if (date1 < date2) {
      return false;
    } else if (date1 > date2) {
      return true;
    } else {
      return false;
    }
  };

  const changeStatusToCompleted = async (id) => {
    try {
      const result = await service.updateTaskStatusToCompleted(id);

      if (result.status === 200) {
        alert(false, result?.message);
      } else {
        alert(true, result?.message);
      }
    } catch (error) {
      alert(
        true,
        "Sorry, server is busy or not available right now. Please try again later !"
      );
      console.log(error);
    } finally {
      refreshTasks();
    }
  };
  return (
    <div className="task-card col-xl-4 col-lg-4 col-md-6 col-sm-12">
      {openTaskActions && selectedTask?.id === task?.id && <UpdateTask />}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`task-card-content d-flex flex-column w-100 h-100 p-3 justify-content-between ${
          hover && task?.priority === "High"
            ? `high`
            : hover && task?.priority === "Medium"
            ? `medium`
            : hover && task?.priority === "Low"
            ? `low`
            : ``
        }`}
      >
        <div className="w-100 d-flex flex-column flex-grow-1">
          <div className="w-100 d-flex flex-row justify-content-between gap-2">
            <div className="d-flex flex-row align-items-center flex-wrap mb-3 task-card-details">
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
              <span
                className={`${
                  task?.status === "Completed" && `completed`
                } px-2 py-1 rounded-pill task-card-status me-2`}
              >
                {task?.status}
              </span>
              <span className="px-2 py-1 rounded-pill task-card-category">
                {task?.category}
              </span>
            </div>
            <div className="checkbox-wrapper-12">
              <div className="cbx">
                <input
                  id="cbx-12"
                  type="checkbox"
                  checked={task?.status === "Completed" ? true : false}
                  onChange={() => {
                    changeStatusToCompleted(task?.id);
                  }}
                />
                <label htmlFor="cbx-12"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <fegaussianblur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    ></fegaussianblur>
                    <fecolormatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></fecolormatrix>
                    <feblend in="SourceGraphic" in2="goo-12"></feblend>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>

          <p
            className={`task-card-title ${
              task?.status === "Completed" && `completed`
            }`}
          >
            {task?.title}
          </p>
          <p className="task-card-date p-0 m-0 mt-auto">- {task?.date}</p>
        </div>
        <div className="w-100 d-flex flex-row task-actions-container align-items-end mt-2">
          <p className="p-0 m-0 task-card-status-overdue">
            {task?.status !== "Completed" && (
              <>
                <span className="me-2">
                  <i className="bi bi-clock-history"></i>
                </span>
                {isOverdue(currentDate, task?.date)
                  ? "Overdue"
                  : task?.date === currentDate
                  ? "Due today"
                  : "Pending"}
              </>
            )}
          </p>
          <button
            className="task-actions-btn rounded-2 ms-auto"
            onClick={() => {
              setSelectedTask(task);
              setOpenTaskActions(!openTaskActions);
            }}
          >
            <i className="bi bi-three-dots icon"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
