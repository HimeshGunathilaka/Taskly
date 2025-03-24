import { usePublicContext } from "../context/Context";

const Settings = () => {
  const { setIsUserLoggedIn, alert } = usePublicContext();

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.setItem("user-id", "");
    localStorage.setItem("user-name", "");
    localStorage.setItem("user-role", "");
    alert(false, "You have signed out successfully !");
  };

  return (
    <div className="container-fluid settings-container w-100 h-100 p-0">
      <div className="w-100 h-auto settings-wrapper d-flex flex-column p-3">
        <h1 className="settings-title mb-3">Account settings</h1>
        <ul className="w-100 p-0 m-0">
          <li>
            <span className="d-flex flex-row w-100 align-items-center justify-content-between">
              <p>Sign out of your account</p>
              <button className="normal-btn" onClick={() => handleLogout()}>
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
