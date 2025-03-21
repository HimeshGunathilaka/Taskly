const DashboardAnalyticsCard = ({ item }) => {
  return (
    <div className="dashboard-analytics-card col-xl-4 col-lg-4 col-md-6 col-sm-12 px-auto">
      <div className="dashboard-analytics-card-content d-flex flex-row align-items-start w-100 h-100 p-3">
        <span
          className={`dashboard-card-icon d-flex align-items-center justify-content-center ${
            item?.type === "Pending"
              ? `pending`
              : item?.type === "Completed"
              ? `completed`
              : `overdue`
          }`}
        >
          {item?.type === "Pending" ? (
            <i className="bi bi-hourglass-split"></i>
          ) : item?.type === "Completed" ? (
            <i class="bi bi-hourglass-bottom"></i>
          ) : (
            <i class="bi bi-alarm"></i>
          )}
        </span>
        <div className="d-flex flex-column align-items-start flex-grow-1 ms-2">
          <h1 className="m-0 p-0 mb-2">{item?.count}</h1>
          <p className="m-0 p-0">{item?.title}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalyticsCard;
