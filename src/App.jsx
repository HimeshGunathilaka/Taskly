import { useState } from "react";
import { PublicContext } from "./context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Layout from "./components/Layout";
import Sidemenu from "./components/Sidemenu";
import Body from "./components/Body";

const list = [
  {
    title: "Complete project report",
    priority: "High",
    category: "Work",
    status: "To do",
    date: "2025-03-25",
    time: "10:00 AM",
    description:
      "Finalize and review the project report, ensuring all data, charts, and analysis are accurate before submission to the manager.",
  },
  {
    title: "Buy groceries",
    priority: "Medium",
    category: "Personal",
    status: "Completed",
    date: "2024-03-02",
    time: "05:30 PM",
    description:
      "Purchase essential items including fresh vegetables, fruits, dairy products, and snacks from the nearby supermarket for the week.",
  },
  {
    title: "Schedule team meeting",
    priority: "High",
    category: "Work",
    status: "To do",
    date: "2024-03-03",
    time: "02:00 PM",
    description:
      "Coordinate with all team members to arrange a virtual meeting, setting the agenda for project milestones and team goals discussion.",
  },
  {
    title: "Call plumber",
    priority: "Low",
    category: "Home",
    status: "In progress",
    date: "2024-03-04",
    time: "11:15 AM",
    description:
      "Contact the plumber to fix the leaking kitchen sink and inspect the bathroom tap for any water pressure issues.",
  },
  {
    title: "Submit tax documents",
    priority: "High",
    category: "Finance",
    status: "In progress",
    date: "2024-03-05",
    time: "09:00 AM",
    description:
      "Gather and upload all required tax documents, including income statements and deductions, before the submission deadline approaches.",
  },
  {
    title: "Read new book",
    priority: "Low",
    category: "Personal",
    status: "To do",
    date: "2024-03-06",
    time: "07:00 PM",
    description:
      "Spend some quiet time reading the new novel, enjoying each chapter while relaxing with a cup of hot tea.",
  },
  {
    title: "Book dentist appointment",
    priority: "Medium",
    category: "Health",
    status: "Completed",
    date: "2024-03-07",
    time: "03:00 PM",
    description:
      "Schedule a dental checkup and cleaning, ensuring to confirm the appointment via phone or the clinic's online portal.",
  },
  {
    title: "Plan weekend trip",
    priority: "Medium",
    category: "Leisure",
    status: "Completed",
    date: "2024-03-08",
    time: "08:00 PM",
    description:
      "Research and organize a relaxing weekend getaway, booking transportation, accommodations, and planning fun activities for the trip.",
  },
  {
    title: "Pay electricity bill",
    priority: "High",
    category: "Finance",
    status: "To do",
    date: "2024-03-09",
    time: "04:00 PM",
    description:
      "Log into the online banking portal and pay the monthly electricity bill before the due date to avoid penalties.",
  },
  {
    title: "Organize workspace",
    priority: "Low",
    category: "Work",
    status: "Completed",
    date: "2024-03-10",
    time: "06:00 PM",
    description:
      "Declutter the desk, arrange documents neatly, wipe surfaces, and create a productive environment for the upcoming work week.",
  },
];

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
          list,
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
