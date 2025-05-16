import { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Packages from "../pages/Packages";
import Bookings from "../pages/Bookings";
import Profile from "../pages/Profile";
import MyAgentPackages from "../pages/MyAgentPackages"; // Agent-specific page
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("packages");
  const { user } = useContext(AuthContext); // 👈 grabbing the user info

  const renderContent = () => {
    switch (activeTab) {
      case "packages":
        return <Packages />;
      case "bookings":
        return <Bookings />;
      case "profile":
        return <Profile />;
      case "my-agent-packages":
        return <MyAgentPackages />;
      default:
        return <Packages />;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar setActiveTab={setActiveTab} user={user} /> {/* 👈 passing user to Sidebar */}
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
