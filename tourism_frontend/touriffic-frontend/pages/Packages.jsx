import { useEffect, useState, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Packages = () => {
  const { token } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);

const handleBooking = async (tourId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        { TourID: tourId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Booking successful!");
    } catch (err) {
  console.error("Booking failed:", err.response ? err.response.data : err.message);
  alert("Could not book the tour.");
}
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, [token]);

  if (packages.length === 0) {
    return <p>Loading tour packages...</p>;
  }

  return (
    <div className="container">
      <h3 className="mb-4">Explore Tour Packages</h3>
      <Carousel>
        {packages.map((pkg, index) => (
          <Carousel.Item key={index}>
            <div className="card text-center p-4 shadow">
              <h4>{pkg.TourName}</h4>
              <p>{pkg.Itinerary}</p>
              <p><strong>Duration:</strong> {pkg.Duration} days</p>
              <p><strong>Price:</strong> ${pkg.Price}</p>
              <button className="btn btn-primary" onClick={() => handleBooking(pkg.TourID)}>Book Now</button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Packages;
