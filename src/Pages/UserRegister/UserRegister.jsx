import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Firestore to set user data
import './UserRegister.css'; // Custom CSS for styling

export const UserRegister = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState(''); // New field for location

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                location: location, // Storing location
                role: 'user' // Set the role to user
            });

            // After successful registration, navigate to user login
            alert(`Registered: ${fullName}, ${username}, ${email}`);
            navigate("/login/UserLogin");
        } catch (error) {
            alert(error.message); // Handling error
        }
    };

    return (
        <div className='register-body'>
            <div className='container_register'>
                <div className='title_register'>USER--REGISTRATION</div>
                <form onSubmit={handleSubmit}>
                    <div className='grid-container'>
                        <div className='input-box'>
                            <span className='details'>Full Name</span>
                            <input
                                type="text"
                                placeholder='Enter Your Name'
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>User Name</span>
                            <input
                                type="text"
                                placeholder='Enter Your User Name'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Password</span>
                            <input
                                type="password"
                                placeholder='Enter Your Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Email</span>
                            <input
                                type="email"
                                placeholder='Enter Your email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Phone Number</span>
                            <input
                                type="text"
                                placeholder='Enter Your phone number'
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Location</span>
                            <input
                                type="text"
                                placeholder='Enter Your Location'
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='button'>
                        <input type='submit' value="Register" />
                    </div>
                </form>
                <div className='login-redirect'>
                    <p>Already have an account? <span onClick={() => navigate('/login/UserLogin')} style={{ cursor: 'pointer', color: 'blue' }}>Login here</span>.</p>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
