const Popup = ({ children, onClose }) => {
  return (
    <div className="popup-container w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="popup-form-container bg-white p-3 rounded-4 d-flex flex-column">
        <button className="close-btn ms-auto" onClick={() => onClose()}>
          <i className="bi bi-x"></i>
        </button>
        <div className="popup-wrapper w-100 h-100 pb-1">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
