import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import './Header.css';
import Sidebar from '../Sidebar/Sidebar'
import { useState } from 'react'

function Header() {
    const [showSid, setShowSid] = useState(false)
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
                                <span className="header__navbar-logo-no-hover">
                                Homepage
                                </span>
                            </li>
                        </ul>
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item">
                                <a href="http://" className="header__navbar-item-link">
                                    <FaIcons.FaBell className="header__navbar-icon" />
                                    Notification
                                    </a>
                            </li>
                            <li className="header__navbar-item header__navbar-item--seperate">
                                <a href="http://" className="header__navbar-item-link">About</a>
                            </li>
                            <li className="header__navbar-item header__navbar-item--strong">
                                Log out
                                <FiIcons.FiLogOut className="header__navbar-icon"/>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Sidebar show = {showSid} />

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
