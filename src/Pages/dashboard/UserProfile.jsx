import React from 'react';
import pic from "../../images/pic.jpeg"; // Update the path if needed
import './UserProfile.css'; // Updated CSS file

const UserProfile = ({ toggleProfile }) => {
  // Sample past bookings data
  const bookings = [
    {
      id: 1,
      service: 'Plumbing',
      provider: 'John Smith',
      date: '2024-09-25',
      status: 'Completed'
    },
    {
      id: 2,
      service: 'Cleaning',
      provider: 'Sarah Lee',
      date: '2024-09-18',
      status: 'Completed'
    },
    {
      id: 3,
      service: 'Electrical',
      provider: 'Mike Davis',
      date: '2024-09-12',
      status: 'Completed'
    }
  ];

  return (
    <div className="profile-popup">
      {/* Profile info section */}
      <div className="profile-info">
        <h2>User Profile</h2>
        <img src={pic} alt="profile" />
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Joined: January 2023</p>
        <button onClick={toggleProfile}>Close</button>
      </div>

      {/* Past bookings section */}
      <div className="bookings-container">
        <h3>Past Bookings</h3>
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <h4>{booking.service}</h4>
            <p>Provider: {booking.provider}</p>
            <p>Date: {booking.date}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
