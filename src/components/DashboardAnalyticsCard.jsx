const DashboardAnalyticsCard = ({ item }) => {
  return (
    <div className="dashboard-analytics-card flex-grow-1">
      <div className="dashboard-analytics-card-content rounded-pill d-flex flex-column align-items-start w-100 h-100 p-2">
        <div className="w-100 d-flex flex-row align-items-center">
          <div className="d-flex flex-row align-items-center justify-content-start me-2">
            <span
              className={`m-0 me-2 dashboard-card-icon rounded-circle d-flex align-items-center justify-content-center ${
                item?.type === "Pending"
                  ? `pending`
                  : item?.type === "Completed"
                  ? `completed`
                  : item?.type === "Overdue"
                  ? `overdue`
                  : `due-today`
              }`}
            >
              {item?.type === "Pending" ? (
                <i className="bi bi-clock-history"></i>
              ) : item?.type === "Completed" ? (
                <i className="bi bi-check-lg"></i>
              ) : item?.type === "Overdue" ? (
                <i className="bi bi-x-lg"></i>
              ) : (
                <i className="bi bi-calendar-check"></i>
              )}
            </span>
            <h1 className="m-0 p-0">{item?.count}</h1>
          </div>
          <h2 className="m-0 ms-3 me-2 p-0">{item?.type} tasks</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalyticsCard;
