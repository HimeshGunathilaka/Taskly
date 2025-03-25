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

// const list = [
//   {
//     title: "Complete project report",
//     priority: "High",
//     category: "Work",
//     status: "To do",
//     date: "2025-03-25",
//     time: "10:00 AM",
//     description:
//       "Finalize and review the project report, ensuring all data, charts, and analysis are accurate before submission to the manager.",
//   },
//   {
//     title: "Buy groceries",
//     priority: "Medium",
//     category: "Personal",
//     status: "Completed",
//     date: "2024-03-02",
//     time: "05:30 PM",
//     description:
//       "Purchase essential items including fresh vegetables, fruits, dairy products, and snacks from the nearby supermarket for the week.",
//   },
//   {
//     title: "Schedule team meeting",
//     priority: "High",
//     category: "Work",
//     status: "To do",
//     date: "2024-03-03",
//     time: "02:00 PM",
//     description:
//       "Coordinate with all team members to arrange a virtual meeting, setting the agenda for project milestones and team goals discussion.",
//   },
//   {
//     title: "Call plumber",
//     priority: "Low",
//     category: "Home",
//     status: "In progress",
//     date: "2024-03-04",
//     time: "11:15 AM",
//     description:
//       "Contact the plumber to fix the leaking kitchen sink and inspect the bathroom tap for any water pressure issues.",
//   },
//   {
//     title: "Submit tax documents",
//     priority: "High",
//     category: "Finance",
//     status: "In progress",
//     date: "2024-03-05",
//     time: "09:00 AM",
//     description:
//       "Gather and upload all required tax documents, including income statements and deductions, before the submission deadline approaches.",
//   },
//   {
//     title: "Read new book",
//     priority: "Low",
//     category: "Personal",
//     status: "To do",
//     date: "2024-03-06",
//     time: "07:00 PM",
//     description:
//       "Spend some quiet time reading the new novel, enjoying each chapter while relaxing with a cup of hot tea.",
//   },
//   {
//     title: "Book dentist appointment",
//     priority: "Medium",
//     category: "Health",
//     status: "Completed",
//     date: "2024-03-07",
//     time: "03:00 PM",
//     description:
//       "Schedule a dental checkup and cleaning, ensuring to confirm the appointment via phone or the clinic's online portal.",
//   },
//   {
//     title: "Plan weekend trip",
//     priority: "Medium",
//     category: "Leisure",
//     status: "Completed",
//     date: "2024-03-08",
//     time: "08:00 PM",
//     description:
//       "Research and organize a relaxing weekend getaway, booking transportation, accommodations, and planning fun activities for the trip.",
//   },
//   {
//     title: "Pay electricity bill",
//     priority: "High",
//     category: "Finance",
//     status: "To do",
//     date: "2024-03-09",
//     time: "04:00 PM",
//     description:
//       "Log into the online banking portal and pay the monthly electricity bill before the due date to avoid penalties.",
//   },
//   {
//     title: "Organize workspace",
//     priority: "Low",
//     category: "Work",
//     status: "Completed",
//     date: "2024-03-10",
//     time: "06:00 PM",
//     description:
//       "Declutter the desk, arrange documents neatly, wipe surfaces, and create a productive environment for the upcoming work week.",
//   },
// ];

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
        const list = result?.data.map((task) => {
          return {
            user_id: task?.user_id,
            ...task,
          };
        });
        setTasks(list);
      }
      console.log(result?.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

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
