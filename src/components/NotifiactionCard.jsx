import { useEffect, useState } from "react";
import { usePublicContext } from "../context/Context";

const NotificationCard = ({ notification }) => {
  const [expand, setExpand] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const { setNavigation } = usePublicContext();

  useEffect(() => {
    setFirstLoad(true);
  }, []);
  return (
    <div className="notification-card py-3 w-100 d-flex align-items-start justify-content-between gap-2 row-gap-3">
      <div className="d-flex align-items-start gap-3 notification-content-wrapper">
        <span className="notification-card-icon rounded-pill d-flex align-items-center justify-content-center">
          <i className="bi bi-calendar-check"></i>
        </span>
        <div className="d-flex flex-column flex-grow-1">
          <p>{notification?.message}</p>
          <button
            className={`show-tasks-btn py-2 px-3 ${
              !firstLoad && (expand ? `slideDown` : `slideUp`)
            }`}
            onClick={() => setNavigation("/")}
          >
            Show tasks
          </button>
        </div>
      </div>
      <button
        className={`notification-expand-btn rounded-pill ${
          !firstLoad && (expand ? `expand` : `compress`)
        }`}
        onClick={() => {
          setFirstLoad(false);
          setExpand(!expand);
        }}
      >
        <i className="bi bi-caret-down-fill"></i>
      </button>
    </div>
  );
};

export default NotificationCard;
