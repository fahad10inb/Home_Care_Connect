import React from 'react'
import { Home, HelpCircle, User, LogOut, Droplet, Zap, Trash2 } from 'lucide-react'
import './UserDashboard.css'
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4B49AC] text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Home Care Connect</h2>
        </div>
        <nav className="mt-8">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#7978E9]">
            <Home className="inline-block mr-2" size={20} />
            Home
          </a>
          <a href="/dashboard/Dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#7978E9]">
            <User className="inline-block mr-2" size={20} />
            Dashboard
          </a>
          <a href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#7978E9]">
            <HelpCircle className="inline-block mr-2" size={20} />
            Help
          </a>
          <a href="/dashboard/UserProfile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#7978E9]">
            <User className="inline-block mr-2" size={20} />
            Profile
          </a>
          <a href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#7978E9]">
            <LogOut className="inline-block mr-2" size={20} />
            Logout
          </a>
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
          <div className="w-10 h-10 rounded-full bg-[#98BDFF] flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Services Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cleaning Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <Trash2 className="text-[#F3797E] mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Cleaning Services</h3>
                <p className="text-gray-600 mb-4">Professional cleaning for your home or office.</p>
                <button className="bg-[#F3797E] text-white py-2 px-4 rounded hover:bg-[#e66b70] transition-colors duration-300" onClick={()=>navigate("/cleaning")} >
                  Find Cleaners
                </button>
              </div>
            </div>

            {/* Plumbing Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <Droplet className="text-[#7DA0FA] mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Plumbing Services</h3>
                <p className="text-gray-600 mb-4">Expert plumbers for all your plumbing needs.</p>
                <button className="bg-[#7DA0FA] text-white py-2 px-4 rounded hover:bg-[#6a8fe3] transition-colors duration-300" onClick={()=>navigate("/plumber")}>
                  Find Plumbers
                </button>
              </div>
            </div>

            {/* Electricity Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <Zap className="text-[#7978E9] mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Electrical Services</h3>
                <p className="text-gray-600 mb-4">Skilled electricians for all electrical repairs.</p>
                <button className="bg-[#7978E9] text-white py-2 px-4 rounded hover:bg-[#6a69d2] transition-colors duration-300" onClick={()=>navigate("/electricity")}>
                  Find Electricians
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}