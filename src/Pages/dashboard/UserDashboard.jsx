import React from 'react'
import logo from "../../images/logo.jpeg";
import pic from "../../images/pic.jpeg";
import { FaUsers } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

import './UserDashboard.css';
import { FaHome, FaUser, FaWallet, FaChartBar, FaTasks, FaCog, FaQuestionCircle, FaSignOutAlt, FaUserCog, FaLaptopCode, FaWordpress, FaPalette, FaAppStoreIos, FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';

const UserDashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="container_dashboard">
      <nav>
        <ul>
          <li>
            <a href="#" className="logo">
              <img src={logo} alt="" />
              <span className="nav-item">DashBoard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FaHome />
              <span className="nav-item">Home</span>
            </a>
          </li>
          <li>
            <a href="/user">
              <FaUser />
              <span className="nav-item">Profile</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FaWallet />
              <span className="nav-item">Dashboard</span>
            </a>
          </li>
          
         
          <li>
            <a href="#">
              <FaQuestionCircle />
              <span className="nav-item">Help</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout">
              <FaSignOutAlt />
              <span className="nav-item">Log out</span>
            </a>
          </li>
        </ul>
      </nav>

      <section className="main">
        <div className="main-top">
          <h1>Services Offered</h1>
          <FaUserCog />{/* on clicking this icon,profile must be displayed */}
        </div>

        <div className="main-skills">
          <div className="card">
           
            <h3>Cleaning</h3>
            <p>We offer exclusive cleaning facilities using newer electronic gadgets.</p>
            <button onClick={()=>navigate("/cleaning")}>Search</button>
          </div>
          <div className="card">
            {/* <FaWordpress /> */}
            <h3>PLUMBING</h3>
            <p>We offer exclusive cleaning facilities using newer electronic gadgets.</p>
            <button>Search</button>
          </div>
          <div className="card">
            {/* <FaPalette /> */}
            <h3>Electricity</h3>
            <p>We offer exclusive cleaning facilities using newer electronic gadgets.</p>
            <button>Search</button>
          </div>
          {/* <div className="card">
            <FaAppStoreIos />
            <h3>IOS dev</h3>
            <p>Join Over 1 million Students.</p>
            <button>Get Started</button>
          </div> */}
        </div>

        <section className="main-course">
          <h1>Reviews</h1>
          <div className="course-box">
            {/* <ul>
              <li className="active">In progress</li>
              <li>Explore</li>
              <li>Incoming</li>
              <li>Finished</li>
            </ul> */}
            <div className="course">
              <div className="box">
              <h3>A Happy Customer</h3>
              <p>Amazing service! I couldn't be happier with my experience!</p>
                <FaUsers className="people1" />

              </div>
              <div className="box">
              <h3>A Happy Customer</h3>
              <p>Amazing service! I couldn't be happier with my experience!</p>
                <FaUsers className="people2" />
              </div>
              <div className="box">
                <h3>A Happy Customer</h3>
                <p>Amazing service! I couldn't be happier with my experience!</p>
                {/* <button>Continue</button> */}
                <FaUsers className="people3" />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
export default UserDashboard;