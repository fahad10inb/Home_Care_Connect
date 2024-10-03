import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/home/Home";
import { Choose } from "./Pages/choose/Choose";
import { UserLogin } from "./Pages/login/UserLogin";
import { UserRegister } from "./Pages/register/UserRegister";
import UserDashboard from "./Pages/dashboard/UserDashboard";
import Dashboard from "./Pages/dashboard/Dashboard";
import ProviderDashboard from "./Pages/provider/ProviderDashboard";
import UserProfile from "./Pages/dashboard/UserProfile";
import ProviderLogin from "./Pages/login/ProviderLogin";
import ProviderRegister from "./Pages/register/ProviderRegister";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/cleaning" element={<Dashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/plogin" element={<ProviderLogin/>}/>
        <Route path="/pregister" element={<ProviderRegister/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
