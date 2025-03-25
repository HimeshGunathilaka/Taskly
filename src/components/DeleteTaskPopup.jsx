import { useEffect, useState } from "react";
import { usePublicContext } from "../context/Context";
import service from "../services/service";

const DeleteTaskPopup = ({ onClose }) => {
  const {
    setPopupTitle,
    selectedTask,
    alert,
    refreshTasks,
    setOpenTaskActions,
  } = usePublicContext();
  const [isLoading, setIsLoading] = useState(false);

  const deleteTask = async () => {
    try {
      setIsLoading(true);
      const result = await service.deleteTask(selectedTask?.id);

      if (result.status === 200) {
        console.log(result.message);
        alert(false, result?.message);
      } else {
        alert(true, result?.message);
      }
    } catch (error) {
      alert(true, error.message);
    } finally {
      setIsLoading(false);
      onClose();
      refreshTasks();
      setOpenTaskActions(false);
    }
  };

  useEffect(() => {
    setPopupTitle("");
  }, []);
  return (
    <div className="delete-popup d-flex flex-column align-items-center">
      <h1 className="delete-popup-title">
        Are you sure you want to delete this task ?
      </h1>
      <div className="d-flex flex-row flex-wrap gap-2 row-gap-2 mt-3">
        <button
          className="create-task-btn px-3 py-2"
          onClick={() => deleteTask()}
        >
          {isLoading ? `Please wait...` : `Delete`}
        </button>
        <button
          className="delete-task-cancel-btn px-3 py-2"
          onClick={() => {
            setOpenTaskActions(false);
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeleteTaskPopup;
