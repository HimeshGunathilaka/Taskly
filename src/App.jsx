import { useState } from "react";
import { PublicContext } from "./context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Layout from "./components/Layout";
import Sidemenu from "./components/Sidemenu";
import Body from "./components/Body";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [navigation, setNavigation] = useState("/");
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <PublicContext.Provider
        value={{
          isLoading,
          setIsLoading,
          navigation,
          setNavigation,
          keyword,
          setKeyword,
        }}
      >
        <Layout>
          <Sidemenu />
          <Body />
        </Layout>
      </PublicContext.Provider>
    </>
  );
}

export default App;
