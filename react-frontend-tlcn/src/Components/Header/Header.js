import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import './Header.css';
import Profile from '../../Pages/Profile/Profile';

function Header() {
    const [showSid, setShowSid] = useState(false)
    const navigate = useNavigate();
    //Sign out xóa Token
    function Logout() {
        if (localStorage.getItem("tokenBearer")) {
            localStorage.removeItem('tokenBearer');
            navigate('/')
        }
    }
    // Chỉnh thanh navbar ra 100% width  
    document.body.style.margin = 0

    return (
        <>
            <header className="header">
                <div className="grid">
                    <nav className="header__navbar">
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item">
                                <FaIcons.FaBars onClick={() => setShowSid(!showSid)} className="header__navbar-icon" />
                            </li>
                            <li className="header__navbar-item">
                                <Link to="/homepage"
                                // onClick={() => setShowSid(!showSid)}
                                >
                                    <span className="header__navbar-logo-no-hover">
                                        Homepage
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="header__navbar-list">
                            {/* <li className="header__navbar-item">
                                <a href="http://" className="header__navbar-item-link">
                                    <FaIcons.FaBell className="header__navbar-icon" />
                                    Notification
                                </a>
                            </li> */}
                            <li className="header__navbar-item header__navbar-item--seperate">
                                <div className="header__navbar-item-link"
                                    onClick={() => { navigate('/profile') }}
                                >About</div>
                            </li>
                            <li className="header__navbar-item header__navbar-item--strong"
                                onClick={() => Logout()}
                            >
                                Log out
                                <FiIcons.FiLogOut className="header__navbar-icon" />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Sidebar show={showSid} setShow={setShowSid} />

            {/* Modal Layout */}
            {/* <div className="modal">
                <div className="modal__overlay">

                </div>
                <div className="modal__body">
                    <div className="modal__inner">

                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Header
