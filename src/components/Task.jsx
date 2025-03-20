import { useEffect, useState } from "react";
import UpdateTask from "./UpdateTask";

// const categories = [
//   { type: "Work", icon: <i class="bi bi-suitcase-lg"></i> },
//   { type: "Home", icon: <i className="bi bi-house"></i> },
//   { type: "Finance", icon: <i className="bi bi-bank"></i> },
//   { type: "Personal", icon: <i className="bi bi-person"></i> },
//   { type: "Leisure", icon: <i className="bi bi-bicycle"></i> },
//   { type: "Health", icon: <i className="bi bi-bandaid"></i> },
// ];

const Task = ({ task }) => {
  const [openTaskActions, setOpenTaskActions] = useState(false);
  const [hover, setHover] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  useEffect(() => {
    setOpenTaskActions(false);
  }, []);

  useEffect(() => {
    setTaskCompleted(task?.status === "Completed" ? true : false);
  }, [task]);
  return (
    <div className="task-card col-xl-4 col-lg-4 col-md-6 col-sm-12">
      {openTaskActions && <UpdateTask />}
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
        <div className="w-100 d-flex flex-column">
          <div className="w-100 d-flex flex-row justify-content-between">
            {/* <span className="task-card-category-icon mb-3 d-flex justify-content-center align-items-center">
              {categories
                ?.filter((category) => category.type === task?.category)
                .map((category) => {
                  return category.icon;
                })}
            </span> */}
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
                  taskCompleted
                    ? `completed`
                    : task?.status === "Completed" && `completed`
                } px-2 py-1 rounded-pill task-card-status me-2`}
              >
                {taskCompleted ? "Completed" : task?.status}
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
                  checked={taskCompleted}
                  onClick={() => setTaskCompleted(!taskCompleted)}
                />
                <label for="cbx-12"></label>
                <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <fegaussianblur
                      in="SourceGraphic"
                      stddeviation="4"
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
              taskCompleted
                ? `completed`
                : task?.status === "Completed" && `completed`
            }`}
          >
            {task?.title}
          </p>
          <p className="task-card-time mt-2">{task?.time}</p>
        </div>
        <div className="w-100 d-flex flex-row task-actions-container align-items-end">
          <p className="p-0 m-0">{task?.date}</p>
          <button
            className="task-actions-btn rounded-2 ms-auto"
            onClick={() => setOpenTaskActions(!openTaskActions)}
          >
            <i className="bi bi-three-dots icon"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
