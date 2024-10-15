import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase'; // Firebase Authentication and Firestore Database
import { collection, getDocs } from 'firebase/firestore';

const ProviderDashboard = () => {
  const navigate = useNavigate();

  // State variables to manage job requests, availability, modal display, and previous bookings
  const [jobs, setJobs] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [providerEmail, setProviderEmail] = useState(null); // Store the logged-in provider's email

  // Fetch the current provider's email from Firebase Auth
  useEffect(() => {
    const fetchProviderEmail = () => {
      const currentUser = auth.currentUser; // Retrieve the current user from Firebase authentication
      if (currentUser) {
        setProviderEmail(currentUser.email); // Set the provider's email
      } else {
        console.error('No user is logged in');
      }
    };
    fetchProviderEmail(); // Call the function to fetch provider email
  }, []);

  // Fetch job requests for the logged-in provider from Firestore
  const fetchJobRequests = async () => {
    try {
      if (!providerEmail) return; // Ensure providerEmail is available before fetching job requests

      const jobRequestsCollection = collection(db, 'jobRequests'); // Reference to Firestore collection 'jobRequests'
      const jobRequestsSnapshot = await getDocs(jobRequestsCollection); // Fetch all job requests
      const jobRequests = jobRequestsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), // Map the document data to an array
      }));

      // Filter jobs where the providerEmail matches the logged-in provider's email
      const filteredJobs = jobRequests.filter(job => job.providerEmail === providerEmail);

      setJobs(filteredJobs); // Set the filtered job requests in state
    } catch (error) {
      console.error('Error fetching job requests:', error);
    }
  };

  // Add accepted job to previous bookings
  const fetchPreviousBookings = (acceptedJob) => {
    const booking = {
      name: acceptedJob.username,
      date: acceptedJob.bookingDate,
      time: acceptedJob.bookingTime,
      location: acceptedJob.location,
      phoneNumber: acceptedJob.phoneNumber,
      providerEmail: acceptedJob.providerEmail,
      userEmail: acceptedJob.userEmail,
    };

    setPreviousBookings((prev) => {
      const updatedBookings = [...prev, booking]; // Add new booking to previous bookings
      localStorage.setItem('previousBookings', JSON.stringify(updatedBookings)); // Save previous bookings to localStorage
      return updatedBookings; // Return the updated array
    });
  };

  // Trigger fetching job requests when providerEmail changes (after it's available)
  useEffect(() => {
    if (providerEmail) {
      fetchJobRequests(); // Fetch job requests when provider's email is set
    }
  }, [providerEmail]);

  // Handle accepting a booking, adding it to previous bookings and removing it from available jobs
  const acceptBooking = (index) => {
    const acceptedJob = jobs[index]; // Get the accepted job from the jobs array
    fetchPreviousBookings(acceptedJob); // Add to previous bookings

    setJobs((prev) => {
      const updatedJobs = [...prev];
      updatedJobs.splice(index, 1); // Remove the accepted job from the jobs array
      return updatedJobs;
    });
  };

  // Handle declining a booking, simply removing it from available jobs
  const declineBooking = (index) => {
    setJobs((prev) => {
      const updatedJobs = [...prev];
      updatedJobs.splice(index, 1); // Remove the declined job from the jobs array
      return updatedJobs;
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-[#4B49AC] text-white w-64 p-5 flex flex-col">
        <h1 className="text-lg font-bold mb-5">Home Care Connect</h1>
        <ul>
          <li className="mb-4 hover:text-gray-300 cursor-pointer" onClick={() => navigate('/')}>Home</li>
          <li className="mb-4 hover:text-gray-300 cursor-pointer">Dashboard</li>
          <li className="mb-4 hover:text-gray-300 cursor-pointer">Help</li>
          <li className="mb-4 hover:text-gray-300 cursor-pointer" onClick={() => navigate('/provider/ProviderProfile')}>Profile</li>
          <li className="hover:text-gray-300 cursor-pointer">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🏠</span>
            <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          </div>
          <span className="text-2xl">👤</span>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {jobs.length > 0 ? (
            jobs.slice(0, 3).map((job, index) => (
              <div key={job.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h2 className="font-bold mb-2">Customer Profile</h2>
                <p><strong>Name:</strong> {job.username}</p>
                <p><strong>Email:</strong> {job.userEmail}</p>
                <p><strong>Phone:</strong> {job.phoneNumber}</p>
                <p><strong>Date:</strong> {job.bookingDate}</p>
                <p><strong>Time:</strong> {job.bookingTime}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <div className="flex justify-between mt-4 gap-4">
                  <button className="bg-[#7978E9] text-white rounded px-4 py-2 hover:bg-[#4B49AC] transition duration-300" onClick={() => acceptBooking(index)}>Accept</button>
                  <button className="bg-[#F3797E] text-white rounded px-4 py-2 hover:bg-[#F3A4A4] transition duration-300" onClick={() => declineBooking(index)}>Decline</button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center">No job requests available.</div>
          )}
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center mb-5">
          <label className="mr-2">Is Available:</label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)} // Toggle provider availability
            className="toggle-checkbox"
          />
        </div>

        {/* Previous Bookings Button */}
        <button
          className="bg-[#98BDFF] text-white rounded px-4 py-2 hover:bg-[#4B49AC] transition duration-300"
          onClick={() => setShowModal(true)} // Show modal with previous bookings
        >
          Previous Bookings
        </button>

        {/* Modal for Previous Bookings */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg w-11/12 md:w-1/2">
              <h2 className="text-lg font-bold mb-4">Previous Bookings</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Customer Name</th>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Time</th>
                    <th className="border px-4 py-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {previousBookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{booking.name}</td>
                      <td className="border px-4 py-2">{booking.date}</td>
                      <td className="border px-4 py-2">{booking.time}</td>
                      <td className="border px-4 py-2">{booking.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="mt-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700 transition duration-300" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
