const Layout = ({ children }) => {
  return (
    <div className="layout-container d-flex flex-row overflow-hidden p-0 m-0">
      {children}
    </div>
  );
};

export default Layout;
