import { useEffect, useState } from "react";
import { PublicContext } from "./context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Layout from "./components/Layout";
import Sidemenu from "./components/Sidemenu";
import Body from "./components/Body";
import Login from "./pages/Login";
import toast, { Toaster } from "react-hot-toast";
import service from "./services/service";

function App() {
  const [openTaskActions, setOpenTaskActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [navigation, setNavigation] = useState("/");
  const [keyword, setKeyword] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const result = await service.getTasks();
      if (result?.status === 200) {
        const userId = parseInt(localStorage.getItem("user-id"), 10);
        if (isNaN(userId)) {
          console.warn("User ID is not valid");
          setTasks([]);
          return;
        }
        const list = result?.data
          .filter((task) => task?.user_id === userId)
          .map((task) => {
            return {
              user_id: task?.user_id,
              ...task,
            };
          });
        setTasks(list);
      }
      console.log(result?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const refreshTasks = () => {
    fetchTasks();
  };

  useEffect(() => {
    setUser(null);
    setNavigation("/");
    if (localStorage.getItem("user-id")) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const alert = (error, message) => {
    if (error) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

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
          refreshTasks,
          tasks,
          isUserLoggedIn,
          setIsUserLoggedIn,
          selectedTask,
          setSelectedTask,
          user,
          setUser,
          alert,
          openPopup,
          setOpenPopup,
          popupTitle,
          setPopupTitle,
          openTaskActions,
          setOpenTaskActions,
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {isUserLoggedIn ? (
          <Layout>
            <Sidemenu />
            <Body />
          </Layout>
        ) : (
          <Login />
        )}
      </PublicContext.Provider>
    </>
  );
}

export default App;
