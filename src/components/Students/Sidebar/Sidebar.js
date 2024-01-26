import React, { useState } from 'react';
import "./sidebar.css";
import VerifyStudToken from '../VerifyToken';
import { Link } from 'react-router-dom';

const StudentSidebar = ({pageContent}) => {
    const { verifyData, LogOut } = VerifyStudToken()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        menuBtnChange();
    };

    const menuBtnChange = () => {
        const closeBtn = document.querySelector("#btn");
        if (isSidebarOpen) {
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    };

    return (
        <div>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="logo-details">
                    <img className=' w-11 rounded-md icon mr-2' src={verifyData.schoolLogo} alt='' />
                    <div className="logo_name">{verifyData.schoolName}</div>
                    <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
                </div>
                <ul className="nav-list">
                    <li>
                        <i className="bx bx-search"></i>
                        <input type="text" placeholder="Search..." />
                        <span className="tooltip">Search</span>
                    </li>
                    <Link to="/student/dashboard">
                    <li>
                        <a href="#">
                            <i className="bx bx-grid-alt"></i>
                            <span className="links_name">Dashboard</span>
                        </a>
                        <span className="tooltip">Dashboard</span>
                    </li>
                    </Link>
                    <Link to="/student/mycourse">
                    <li>
                        <a href="#">
                        <i class='bx bxs-book-bookmark'></i>
                            <span className="links_name">My Course</span>
                        </a>
                        <span className="tooltip">My Course</span>
                    </li>
                    </Link>
                    <li>
                        <a href="#">
                            <i className="bx bx-grid-alt"></i>
                            <span className="links_name">Dashboard</span>
                        </a>
                        <span className="tooltip">Dashboard</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bx bx-grid-alt"></i>
                            <span className="links_name">Dashboard</span>
                        </a>
                        <span className="tooltip">Dashboard</span>
                    </li>

                </ul>
                <li className="profile">
                    <div className="profile-details">
                        <img src={verifyData.image} alt="profileImg" />
                        <div className="name_job">
                            <div className="name">{verifyData.name}</div>
                            <div className="job capitalize">{verifyData.gender}</div>
                        </div>
                    </div>
                    <button onClick={LogOut}>
                        <i className="bx bx-log-out" id="log_out"></i>
                    </button>
                </li>
            </div>

            <section className="home-section">
                {pageContent}
            </section>
        </div>
    );
};

export default StudentSidebar;
