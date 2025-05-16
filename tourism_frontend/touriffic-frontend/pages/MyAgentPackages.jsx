import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyAgentPackages = () => {
  const { token } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    TourName: "",
    Price: "",
    Duration: "",
    Itinerary: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchMyPackages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/packages/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPackages(res.data);
    } catch (err) {
      console.error("Failed to fetch your packages", err);
    }
  };

  useEffect(() => {
    fetchMyPackages();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        // Update mode
        await axios.put(`http://localhost:5000/api/packages/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Package updated!");
        setEditingId(null);
      } else {
        // Create mode
        await axios.post("http://localhost:5000/api/packages", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Package created!");
      }

      setForm({ TourName: "", Price: "", Duration: "", Itinerary: "" });
      fetchMyPackages();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyPackages();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg.TourID);
    setForm({
      TourName: pkg.TourName,
      Price: pkg.Price,
      Duration: pkg.Duration,
      Itinerary: pkg.Itinerary,
    });
  };

  return (
    <div className="container">
      <h3 className="mb-3">{editingId ? "Edit Package" : "Add New Tour Package"}</h3>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            className="form-control"
            name="TourName"
            value={form.TourName}
            placeholder="Tour Name"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            name="Price"
            value={form.Price}
            placeholder="Price"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            name="Duration"
            value={form.Duration}
            placeholder="Duration (days)"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            name="Itinerary"
            value={form.Itinerary}
            placeholder="Itinerary"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12">
          <button className="btn btn-success me-2" onClick={handleSubmit}>
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button className="btn btn-secondary" onClick={() => setEditingId(null)}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <h4 className="mt-5">My Created Packages</h4>
      <ul className="list-group">
        {packages.map((pkg) => (
          <li key={pkg.TourID} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <strong>{pkg.TourName}</strong> (${pkg.Price}) – {pkg.Duration} days
              <br />
              <small>{pkg.Itinerary}</small>
            </div>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(pkg)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(pkg.TourID)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAgentPackages;
