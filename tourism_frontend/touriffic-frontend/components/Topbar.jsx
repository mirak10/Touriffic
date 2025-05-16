const Topbar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom p-3">
      <input type="text" placeholder="Search..." className="form-control w-25" />
      <div>Welcome back 👋</div>
    </div>
  );
};

export default Topbar;