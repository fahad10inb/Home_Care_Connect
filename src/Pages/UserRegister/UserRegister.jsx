import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Firestore to set user data
import './UserRegister.css'; // Custom CSS for styling

export const UserRegister = () => {
    // State variables to handle form input fields
    const [userData, setUserData] = useState({
        fullName: '',
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        location: '',
    });

    const navigate = useNavigate();

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, username, password, email, phoneNumber, location } = userData;
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store additional user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                location: location,
                role: 'user' // Set the role to user
            });

            // Store user data in localStorage for access elsewhere
            const userInfo = {
                uid: user.uid,
                fullName: fullName,
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                location: location,
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // After successful registration, navigate to user login
            alert(`Registered successfully: ${fullName}`);
            navigate("/login/UserLogin");
        } catch (error) {
            alert(`Error: ${error.message}`); // Handle registration errors
        }
    };

    return (
        <div className='register-body'>
            <div className='container_register'>
                <div className='title_register'>USER REGISTRATION</div>
                <form onSubmit={handleSubmit}>
                    <div className='grid-container'>
                        <div className='input-box'>
                            <span className='details'>Full Name</span>
                            <input
                                type="text"
                                name="fullName"
                                placeholder='Enter Your Name'
                                required
                                value={userData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>User Name</span>
                            <input
                                type="text"
                                name="username"
                                placeholder='Enter Your User Name'
                                required
                                value={userData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Password</span>
                            <input
                                type="password"
                                name="password"
                                placeholder='Enter Your Password'
                                required
                                value={userData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Email</span>
                            <input
                                type="email"
                                name="email"
                                placeholder='Enter Your Email'
                                required
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Phone Number</span>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder='Enter Your Phone Number'
                                required
                                value={userData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Location</span>
                            <input
                                type="text"
                                name="location"
                                placeholder='Enter Your Location'
                                required
                                value={userData.location}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='button'>
                        <input type='submit' value="Register" />
                    </div>
                </form>
                <div className='login-redirect'>
                    <p>Already have an account? 
                        <span onClick={() => navigate('/login/UserLogin')} style={{ cursor: 'pointer', color: 'blue' }}>
                            Login here
                        </span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
