import { useState } from "react";
import Popup from "./Popup";
import UpdateTaskForm from "./UpdateTaskForm";

const UpdateTask = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleClick = () => {
    setOpenPopup(true);
  };
  return (
    <>
      {openPopup && (
        <Popup onClose={() => setOpenPopup(false)} title={"Update task"}>
          <UpdateTaskForm />
        </Popup>
      )}
      <div className="task-actions-menu p-2">
        <ul className="p-0 m-0">
          <li>
            <button
              className="p-0 px-3 m-0 w-100 py-2 d-flex flex-row justify-content-start"
              onClick={() => handleClick()}
            >
              <i className="bi bi-pencil me-2"></i>Edit
            </button>
          </li>
          <li>
            <button
              className="p-0 px-3 m-0 w-100 py-2 d-flex flex-row justify-content-start"
              onClick={() => handleClick()}
            >
              <i className="bi bi-filetype-pdf me-2"></i>Export
            </button>
          </li>
          <li>
            <button
              className="p-0 px-3 m-0 w-100 py-2 d-flex flex-row justify-content-start"
              onClick={() => handleClick()}
            >
              <i className="bi bi-trash3 me-2"></i>Delete
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UpdateTask;
