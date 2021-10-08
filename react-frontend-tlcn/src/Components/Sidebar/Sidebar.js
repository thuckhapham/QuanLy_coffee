import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar({show}) {
     return (
        <>
        <div className={show ? 'sidebar active' : 'sidebar'}>
            <ul className="sidebar__list">
                <li className="sidebar__item">
                    <Link to="/" className="sidebar__item-link">Home</Link>
                </li>
                <li className="sidebar__item">
                    <Link to="/inventory" className="sidebar__item-link">Order History</Link>
                </li>
                <li className="sidebar__item">
                    <Link to="/member" className="sidebar__item-link">Members</Link>
                </li>
                <li className="sidebar__item">
                    <Link to="/" className="sidebar__item-link">Sales Revenue</Link>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Sidebar
