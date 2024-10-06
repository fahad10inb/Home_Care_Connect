import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home"; // Ensure this is the correct default import
import Choose from "./Pages/choose/Choose";
import UserLogin from "./Pages/login/UserLogin";
import UserRegister from "./Pages/UserRegister/UserRegister"; // Adjust the path accordingly
import UserDashboard from "./Pages/dashboard/UserDashboard";
import Dashboard from "./Pages/dashboard/Dashboard";
import ProviderDashboard from "./Pages/provider/ProviderDashboard";
import UserProfile from "./Pages/dashboard/UserProfile";
import ProviderLogin from "./Pages/login/ProviderLogin";
import ProviderRegister from "./Pages/ProviderRegister/ProviderRegister"; // Adjust the path accordingly
import PlumberDashboard from './Pages/dashboard/PlumberDashboard';
import ElectricityDashboard from './Pages/dashboard/ElectricityDashboard';
import ProviderProfile from './Pages/provider/ProviderProfile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/login/UserLogin" element={<UserLogin />} />
        <Route path="/UserRegister/UserRegister" element={<UserRegister />} /> {/* Correct path for User Register */}
        <Route path="/ProviderRegister/ProviderRegister" element={<ProviderRegister />} /> {/* Correct path for Provider Register */}
        <Route path="/dashboard/Dashboard" element={<UserDashboard />} />
        <Route path="/cleaning" element={<Dashboard />} />
        <Route path="/provider/ProviderDashboard" element={<ProviderDashboard />} />
        <Route path="/dashboard/UserProfile" element={<UserProfile />} />
        <Route path="/login/ProviderLogin" element={<ProviderLogin />} />
        <Route path="/plumber" element={<PlumberDashboard />} />
        <Route path="/electricity" element={<ElectricityDashboard />} />
        <Route path="/provider/ProviderProfile" element={<ProviderProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
