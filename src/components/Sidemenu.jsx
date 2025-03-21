import { useEffect, useState } from "react";
import { usePublicContext } from "../context/Context";

const navigations = [
  {
    icon: <i class="bi bi-boxes icon me-3"></i>,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <i class="bi bi-list-task icon me-3"></i>,
    title: "To do list",
    path: "/to-do",
  },
  {
    icon: <i class="bi bi-gear icon me-3"></i>,
    title: "Settings",
    path: "/settings",
  },
];

const Sidemenu = () => {
  const [openSidemenu, setOpenSideMenu] = useState(true);
  const { navigation, setNavigation } = usePublicContext();

  useEffect(() => {
    setOpenSideMenu(true);
  }, []);
  return (
    <div
      className={`sidemenu-container p-3 ${openSidemenu ? `open` : `close`}`}
    >
      <button
        className={`side-menu-toggle-btn rounded-circle ${
          !openSidemenu && `closed`
        }`}
        onClick={() => setOpenSideMenu(!openSidemenu)}
      >
        <i class="bi bi-arrows-angle-expand side-menu-toggle-icon"></i>
      </button>
      <div className="sidemenu-wrapper h-100 w-100 d-flex flex-column">
        <div className="d-flex flex-row align-items-center justify-content-start w-100 mb-3">
          <img
            src="/images/check.png"
            className="brand-logo"
            alt="brand-logo"
          />
          <h1 className="brand-name ms-2">Taskly</h1>
        </div>
        <div className="sidemenu-list-wrapper flex-grow-1 mt-3">
          <ul className="p-0 m-0">
            {navigations?.map((item, index) => {
              return (
                <li key={index}>
                  <button
                    className={`sidemenu-list-btn ${
                      item.path === navigation && `active`
                    }`}
                    onClick={() => setNavigation(item?.path)}
                  >
                    {item?.icon}
                    {item?.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
