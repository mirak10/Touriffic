import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";



const Bookings = () => {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, [token]);

  if (bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div className="container">
      <h3 className="mb-4">My Bookings</h3>
      <div className="row">
        {bookings.map((booking, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>{booking.TourName}</h5>
              <p><strong>Status:</strong> {booking.BookingStatus}</p>
              <p><strong>Booked on:</strong> {new Date(booking.BookingDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
