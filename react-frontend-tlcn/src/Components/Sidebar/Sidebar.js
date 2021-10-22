import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar(props) {
    return (
        <>
            <div className={props.show ? "sidebar active" : "sidebar"}>
                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <Link
                            to="/"
                            className="sidebar__item-link"
                            onClick={() => props.setShow(!props.show)}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="sidebar__item">
                        <Link
                            to="/orderhistory"
                            className="sidebar__item-link"
                            onClick={() => props.setShow(!props.show)}
                        >
                            Order History
                        </Link>
                    </li>
                    <li className="sidebar__item">
                        <Link
                            to="/member"
                            className="sidebar__item-link"
                            onClick={() => props.setShow(!props.show)}
                        >
                            Members
                        </Link>
                    </li>
                    <li className="sidebar__item">
                        <Link to="/"
                            className="sidebar__item-link"
                            onClick={() => props.setShow(!props.show)}
                        >
                            Sales Revenue
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
