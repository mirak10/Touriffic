const Sidebar = ({ setActiveTab, user }) => {
  console.log("UserType in sidebar:", user?.UserType);
  return (
    <div className="bg-light border-end p-3" style={{ width: "220px", minHeight: "100vh" }}>
      <h4 className="mb-4">Touriffic</h4>

      <button className="btn btn-outline-primary w-100 mb-2" onClick={() => setActiveTab("packages")}>
        Packages
      </button>

      <button className="btn btn-outline-primary w-100 mb-2" onClick={() => setActiveTab("bookings")}>
        My Bookings
      </button>

      <button className="btn btn-outline-primary w-100 mb-2" onClick={() => setActiveTab("profile")}>
        My Account
      </button>

      {/* 👑 Only agents see this button */}
      {user?.UserType === "Agency" && (
        <button className="btn btn-outline-primary w-100 mb-2" onClick={() => setActiveTab("my-agent-packages")}>
          My Packages
        </button>
      )}

      <button
        className="btn btn-danger w-100 mt-5"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
    
  );
};

export default Sidebar;
