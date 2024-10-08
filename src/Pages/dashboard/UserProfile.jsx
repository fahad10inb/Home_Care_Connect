import React, { useState, useEffect } from 'react';
import { Home, HelpCircle, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import pic from "../../images/pic.jpeg";

export default function UserProfile({ toggleProfile }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        await fetchUserData(user);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (user) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.error("User not found in Firestore.");
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-[#4B49AC] text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Home Care Connect</h2>
        </div>
        <nav className="mt-8">
          {['Home', 'Dashboard', 'Help', 'Profile', 'Logout'].map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={() => {
                if (index === 0) navigate('#');
                if (index === 1) navigate('/dashboard/Dashboard');
                if (index === 4) navigate('/');
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
            {loading ? (
              <p className="text-gray-600 text-center">Loading user data...</p>
            ) : userData ? (
              <div className="flex flex-col items-center">
                <img 
                  src={`${pic}?height=128&width=128`} 
                  alt="profile" 
                  className="w-32 h-32 rounded-full border-4 border-[#4B49AC] mb-4 shadow-lg" 
                />
                <h2 className="text-2xl font-semibold text-gray-800 text-center">{userData.fullName}</h2>
                <div className="flex flex-col w-full max-w-md space-y-4 mt-4">
                  {[
                    { label: 'Email', value: userData.email },
                    { label: 'Username', value: userData.username },
                    { label: 'Location', value: userData.location },
                    { label: 'Phone Number', value: userData.phoneNumber }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-600 font-medium w-1/3">{item.label}:</span>
                      <span className="text-gray-800 font-semibold flex-1">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center">No user data found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
