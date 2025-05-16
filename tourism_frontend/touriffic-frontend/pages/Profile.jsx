import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { token, logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    UserName: "",
    Email: "",
    ContactNumber: ""
  });

  // 🚀 Fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForm(res.data); // assuming res.data = { UserName, Email, ContactNumber }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/api/users/update", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated!");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await axios.delete("http://localhost:5000/api/users/delete", {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Account deleted.");
      logout();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4">My Account</h3>
      <div className="mb-3">
        <label>Username:</label>
        <input className="form-control" name="UserName" value={form.UserName} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Email:</label>
        <input className="form-control" name="Email" value={form.Email} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Contact Number:</label>
        <input className="form-control" name="ContactNumber" value={form.ContactNumber} onChange={handleChange} />
      </div>
      <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
      <button className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default Profile;
