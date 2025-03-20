import { useEffect, useState } from "react";
import Task from "../components/Task";
import { usePublicContext } from "../context/Context";

const list = [
  {
    title: "Complete project report",
    priority: "High",
    category: "Work",
    status: "To do",
    date: "2024-03-01",
    time: "10:00 AM",
    description:
      "Finalize and review the project report, ensuring all data, charts, and analysis are accurate before submission to the manager.",
  },
  {
    title: "Buy groceries",
    priority: "Medium",
    category: "Personal",
    status: "Completed",
    date: "2024-03-02",
    time: "05:30 PM",
    description:
      "Purchase essential items including fresh vegetables, fruits, dairy products, and snacks from the nearby supermarket for the week.",
  },
  {
    title: "Schedule team meeting",
    priority: "High",
    category: "Work",
    status: "To do",
    date: "2024-03-03",
    time: "02:00 PM",
    description:
      "Coordinate with all team members to arrange a virtual meeting, setting the agenda for project milestones and team goals discussion.",
  },
  {
    title: "Call plumber",
    priority: "Low",
    category: "Home",
    status: "In progress",
    date: "2024-03-04",
    time: "11:15 AM",
    description:
      "Contact the plumber to fix the leaking kitchen sink and inspect the bathroom tap for any water pressure issues.",
  },
  {
    title: "Submit tax documents",
    priority: "High",
    category: "Finance",
    status: "In progress",
    date: "2024-03-05",
    time: "09:00 AM",
    description:
      "Gather and upload all required tax documents, including income statements and deductions, before the submission deadline approaches.",
  },
  {
    title: "Read new book",
    priority: "Low",
    category: "Personal",
    status: "To do",
    date: "2024-03-06",
    time: "07:00 PM",
    description:
      "Spend some quiet time reading the new novel, enjoying each chapter while relaxing with a cup of hot tea.",
  },
  {
    title: "Book dentist appointment",
    priority: "Medium",
    category: "Health",
    status: "Completed",
    date: "2024-03-07",
    time: "03:00 PM",
    description:
      "Schedule a dental checkup and cleaning, ensuring to confirm the appointment via phone or the clinic's online portal.",
  },
  {
    title: "Plan weekend trip",
    priority: "Medium",
    category: "Leisure",
    status: "Completed",
    date: "2024-03-08",
    time: "08:00 PM",
    description:
      "Research and organize a relaxing weekend getaway, booking transportation, accommodations, and planning fun activities for the trip.",
  },
  {
    title: "Pay electricity bill",
    priority: "High",
    category: "Finance",
    status: "To do",
    date: "2024-03-09",
    time: "04:00 PM",
    description:
      "Log into the online banking portal and pay the monthly electricity bill before the due date to avoid penalties.",
  },
  {
    title: "Organize workspace",
    priority: "Low",
    category: "Work",
    status: "Completed",
    date: "2024-03-10",
    time: "06:00 PM",
    description:
      "Declutter the desk, arrange documents neatly, wipe surfaces, and create a productive environment for the upcoming work week.",
  },
];

const Tasks = () => {
  const { keyword, setKeyword } = usePublicContext();
  const [priorityType, setPriorityType] = useState("All");
  const [categoryType, setCategoryType] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusType, setStatusType] = useState("All");

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
  }, [priorityType, keyword, categoryType, statusType]);

  return (
    <div className="container-fluid tasks-container w-100 h-100">
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
          <button className="px-3 normal-btn create-task-btn">Create</button>
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
  );
};

export default Tasks;
