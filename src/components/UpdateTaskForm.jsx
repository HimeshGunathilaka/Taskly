import { useEffect, useState } from "react";

const UpdateTaskForm = ({ task }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("To do");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTitle(task?.title);
    setCategory(task?.category);
    setIsLoading(false);
  }, [task]);
  return (
    <form className="d-flex flex-column update-task-form">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        className="m-0 my-2 px-2 py-1"
        placeholder="Enter your title"
        value={title}
      />
      <label htmlFor="category">Category</label>
      <select
        id="category"
        className="m-0 my-2 px-2 py-1"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Work">Work</option>
        <option value="Finance">Finance</option>
        <option value="Leisure">Leisure</option>
        <option value="Health">Health</option>
        <option value="Personal">Personal</option>
        <option value="Home">Home</option>
      </select>
      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        className="m-0 my-2 px-2 py-1"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <label htmlFor="status">Status</label>
      <select
        id="status"
        className="m-0 my-2 px-2 py-1"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="To do">To do</option>
        <option value="In progress">In progress</option>
        <option value="Completed">Completed</option>
      </select>
      <label htmlFor="date">Date</label>
      <input type="date" className="m-0 my-2 px-2 py-1 date-picker" />

      <button id="date" className="submit-btn mt-3 py-2">
        {isLoading ? "Please wait..." : "Submit"}
      </button>
    </form>
  );
};

export default UpdateTaskForm;
