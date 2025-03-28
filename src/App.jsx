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
import useSound from "use-sound";
import successSound from "./audio/success.mp3";
import failSound from "./audio/fail.mp3";

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
  const [success] = useSound(successSound);
  const [fail] = useSound(failSound);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [dueTodayTasks, setDueTodayTasks] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const currentDate =
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-" +
    String(new Date().getDate()).padStart(2, "0");

  const isOverdue = (currentDate, statedDate) => {
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day).getTime();
    };

    const current = formatDate(currentDate);
    const stated = formatDate(statedDate);

    return current > stated;
  };

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
    } catch (error) {
      alert(
        true,
        "Sorry, server is busy or not available right now. Please try again later !"
      );
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
    setDueTodayTasks(
      tasks?.filter(
        (task) => task?.date === currentDate && task?.status !== "Completed"
      )
    );

    console.log(
      tasks?.filter(
        (task) =>
          !isOverdue(currentDate, task?.date) && task?.status !== "Completed"
      )
    );

    setPendingTasks(
      tasks?.filter(
        (task) =>
          !isOverdue(currentDate, task?.date) && task?.status !== "Completed"
      )
    );

    setCompletedTasks(tasks?.filter((task) => task?.status === "Completed"));

    setOverdueTasks(
      tasks?.filter(
        (task) =>
          isOverdue(currentDate, task?.date) && task?.status !== "Completed"
      )
    );
  }, [tasks, currentDate]);

  useEffect(() => {
    setNavigation("/");
    if (localStorage.getItem("user-id")) {
      setUser({
        id: localStorage.getItem("user-id"),
        username: localStorage.getItem("user-name"),
        role: localStorage.getItem("user-role"),
      });
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const alert = (error, message, sound) => {
    if (error) {
      if (sound) {
        fail();
      }
      toast.error(message);
    } else {
      if (sound) {
        success();
      }
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
          pendingTasks,
          overdueTasks,
          completedTasks,
          dueTodayTasks,
          openNotifications,
          setOpenNotifications,
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {localStorage.getItem("user-id") !== "" ? (
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
