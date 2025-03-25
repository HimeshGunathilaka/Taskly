import { usePublicContext } from "../context/Context";

const Popup = ({ children, onClose, title }) => {
  const { setOpenTaskActions } = usePublicContext();
  return (
    <div className="popup-container w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="popup-form-container bg-white p-4 rounded-4 d-flex flex-column">
        <span className="w-100 d-flex flex-row">
          <h1 className="popup-header">{title}</h1>
          <button
            className="close-btn ms-auto"
            onClick={() => {
              setOpenTaskActions(false);
              onClose();
            }}
          >
            <i className="bi bi-x"></i>
          </button>
        </span>
        <div className="popup-wrapper w-100 h-100 pb-3 mt-3">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
