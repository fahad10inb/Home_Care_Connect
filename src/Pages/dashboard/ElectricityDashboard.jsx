import React, { useState } from 'react'
import { Home, HelpCircle, User, LogOut, X } from 'lucide-react'
import { useNavigate } from "react-router-dom";

const workers = [
  { 
    id: 1, 
    name: 'Ravi Kumar', 
    email: 'ravikumar@gmail.com', 
    rating: 4.8, 
    phone: '+91 98765 43210', 
    about: 'Ravi is a dedicated cleaner with 5 years of experience in residential and commercial cleaning.',
    image: 'https://www.shutterstock.com/image-photo/portrait-african-black-worker-standing-600nw-2114436797.jpg'
  },
  { 
    id: 2, 
    name: 'Priya Singh', 
    email: 'priyasingh@gmail.com', 
    rating: 4.9, 
    phone: '+91 87654 32109', 
    about: 'Priya specializes in deep cleaning and organization, ensuring every corner of your space sparkles.',
    image: 'https://media.istockphoto.com/id/1430852855/photo/happy-engineer-construction-worker-or-architect-woman-feeling-proud-and-satisfied-with-career.jpg?s=612x612&w=0&k=20&c=GHed-u9xlIYefGqLp4jgiN0J5H_kvNOrUQXkL08xUoc='
  },
  { 
    id: 3, 
    name: 'Amit Sharma', 
    email: 'amitsharma@gmail.com', 
    rating: 4.7, 
    phone: '+91 76543 21098', 
    about: 'Amit is known for his attention to detail and efficiency, providing top-notch cleaning services.',
    image: 'https://www.familyhandyman.com/wp-content/uploads/2021/03/woman-construction-worker-GettyImages-463207617.jpg'
  },
]

export default function ElectricityDashboard() {
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [successMessage, setSuccessMessage] = useState('') // State for success message
  const navigate = useNavigate();
  
  const openModal = (worker) => {
    setSelectedWorker(worker)
  }

  const closeModal = () => {
    setSelectedWorker(null)
    setBookingDate('')
    setBookingTime('')
    setSuccessMessage('') // Reset success message on close
  }

  const confirmBooking = () => {
    setSuccessMessage(`Booking successful for ${selectedWorker.name}!`)
    // You can also close the modal here if needed
    // closeModal();
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4B49AC] text-white transition-colors duration-300 ease-in-out hover:bg-[#3f3e91]">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Home Care Connect</h2>
        </div>
        <nav className="mt-8">
          {['Home', 'Dashboard', 'Help', 'Profile', 'Logout'].map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={() => {
                if (index === 0) {
                  navigate('#'); // Redirect to home
                }
                else if(index === 1){
                    navigate('/dashboard/Dashboard');
                }
                else if(index === 2){
                    navigate('/');
                }
                else if(index === 3){
                    navigate('/dashboard/UserProfile');
                }
                else if(index === 4){
                    navigate('/');
                }
              }}
              className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[#7978E9] hover:translate-x-1"
            >
              {index === 0 && <Home className="mr-2" size={20} />}
              {index === 1 && <User className="mr-2" size={20} />}
              {index === 2 && <HelpCircle className="mr-2" size={20} />}
              {index === 3 && <User className="mr-2" size={20} />}
              {index === 4 && <LogOut className="mr-2" size={20} />}
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <div className="flex items-center">
            <Home className="text-[#4B49AC]" size={24} />
            <h1 className="ml-2 text-xl font-semibold text-[#4B49AC]">Home Care Connect</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#98BDFF] flex items-center justify-center transition-colors duration-300 ease-in-out hover:bg-[#7DA0FA]">
            <User className="text-white" size={20} />
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Electricians</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map((worker) => (
              <div key={worker.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="p-6">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#7978E9] transition-all duration-300 hover:border-[#4B49AC]">
                    <img src={worker.image} alt={worker.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{worker.name}</h3>
                  <p className="text-gray-600 mb-2">{worker.email}</p>
                  <p className="text-gray-600 mb-4">Rating: {worker.rating}/5</p>
                  <button
                    onClick={() => openModal(worker)}
                    className="w-full bg-[#7DA0FA] text-white py-2 px-4 rounded transition-all duration-300 hover:bg-[#6a8fe3] hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Booking Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full relative"> {/* Increased width */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-transform duration-300 hover:scale-110"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">{selectedWorker.name}</h2>
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#7978E9]">
              <img src={selectedWorker.image} alt={selectedWorker.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-gray-600 mb-4">{selectedWorker.about}</p>
            <p className="text-gray-600 mb-2">Email: {selectedWorker.email}</p>
            <p className="text-gray-600 mb-2">Phone: {selectedWorker.phone}</p>
            <p className="text-gray-600 mb-4">Rating: {selectedWorker.rating}/5</p>
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>} {/* Success message */}
            <div className="space-y-4">
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-[#4B49AC] focus:outline-none transition-colors duration-300"
              />
              <input
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-[#4B49AC] focus:outline-none transition-colors duration-300"
              />
              <button
                onClick={confirmBooking}
                className="w-full bg-[#4B49AC] text-white py-2 rounded transition-all duration-300 hover:bg-[#3f3e91]"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
