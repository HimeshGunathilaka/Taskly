import { useEffect, useState } from "react";
import Task from "../components/Task";
import { usePublicContext } from "../context/Context";
import Loading from "../components/Loading";
import Popup from "../components/Popup";
import UpdateTaskForm from "../components/UpdateTaskForm";

const Tasks = () => {
  const { keyword, setKeyword, list } = usePublicContext();
  const [priorityType, setPriorityType] = useState("All");
  const [categoryType, setCategoryType] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusType, setStatusType] = useState("All");
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const filteredByKeyword = list?.filter((task) =>
      keyword === ""
        ? task
        : task?.title
            .toString()
            .toLowerCase()
            .includes(keyword?.toString().toLowerCase())
    );

    const filteredByCategoryAndKeyword = filteredByKeyword.filter((task) =>
      categoryType === "All" ? task : task?.category === categoryType
    );

    const filteredByCategoryAndKeywordAndStatus =
      filteredByCategoryAndKeyword.filter((task) =>
        statusType === "All" ? task : task?.status === statusType
      );

    const filteredByAll = filteredByCategoryAndKeywordAndStatus.filter((task) =>
      priorityType === "All" ? task : priorityType === task?.priority
    );
    setFilteredTasks(filteredByAll);
  }, [priorityType, keyword, categoryType, statusType, list]);

  return (
    <>
      {openPopup && (
        <Popup onClose={() => setOpenPopup(false)}>
          <UpdateTaskForm />
        </Popup>
      )}
      <div className="container-fluid tasks-container w-100 h-100 p-0">
        <div className="w-100 p-3 d-flex flex-row tasks-header row-gap-2 mb-3 justify-content-between flex-wrap">
          <div className="d-flex flex-row search-bar-holder align-items-center px-2 position-relative gap-3">
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
            <button
              className="px-3 normal-btn create-task-btn"
              onClick={() => {
                setOpenPopup(true);
              }}
            >
              Create
            </button>
          </span>
        </div>
        <div className="tasks-wrapper row row-gap-4 m-0 p-0">
          {filteredTasks?.length ? (
            filteredTasks?.map((task, index) => {
              return <Task key={index} task={task} />;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Tasks;
