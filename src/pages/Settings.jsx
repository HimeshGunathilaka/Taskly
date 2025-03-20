import { usePublicContext } from "../context/Context";

const Settings = () => {
  const { setIsUserLoggedIn } = usePublicContext();
  return (
    <div className="container-fluid settings-container w-100 h-100 p-0">
      <div className="w-100 h-auto settings-wrapper d-flex flex-column p-3">
        <h1 className="settings-title mb-3">Account settings</h1>
        <ul className="w-100 p-0 m-0">
          <li>
            <span className="d-flex flex-row w-100 align-items-center justify-content-between">
              <p>Sign out of your account</p>
              <button
                className="normal-btn"
                onClick={() => setIsUserLoggedIn(false)}
              >
                Logout
              </button>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
