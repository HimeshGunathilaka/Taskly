const NotificationCard = ({ notification }) => {
  return (
    <div className="notification-card p-3 w-100 d-flex flex-row align-items-center justify-content-between">
      <div className="d-flex flex-row align-items-center gap-3">
        <span className="notification-card-icon rounded-pill d-flex align-items-center justify-content-center">
          <i className="bi bi-calendar-check"></i>
        </span>
        <p>{notification?.message}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
