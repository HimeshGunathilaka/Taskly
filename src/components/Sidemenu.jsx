import { useEffect, useState } from "react";
import { usePublicContext } from "../context/Context";

const navigations = [
  {
    icon: <i className="bi bi-boxes icon me-3"></i>,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <i className="bi bi-list-task icon me-3"></i>,
    title: "To do list",
    path: "/to-do",
  },
  {
    icon: <i className="bi bi-gear icon me-3"></i>,
    title: "Settings",
    path: "/settings",
  },
];

const Sidemenu = () => {
  const [openSidemenu, setOpenSideMenu] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const { navigation, setNavigation } = usePublicContext();

  useEffect(() => {
    setOpenSideMenu(true);
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={`sidemenu-container ${openSidemenu ? `open` : `close`}`}>
      <div className="sidemenu-container-wrapper p-3 overflow-hidden">
        <button
          className={`side-menu-toggle-btn rounded-circle ${
            !openSidemenu && `closed`
          }`}
          onClick={() => setOpenSideMenu(!openSidemenu)}
        >
          <i className="bi bi-arrows-angle-expand side-menu-toggle-icon"></i>
        </button>
        <div className="sidemenu-wrapper h-100 w-100 d-flex flex-column">
          <div className="d-flex flex-row align-items-center justify-content-start w-100 mb-3">
            <img
              src="/images/check.webp"
              className="brand-logo"
              alt="brand-logo"
              loading="lazy"
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
                      onClick={() => {
                        setNavigation(item?.path);
                        width <= 768 && setOpenSideMenu(false);
                      }}
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
    </div>
  );
};

export default Sidemenu;
