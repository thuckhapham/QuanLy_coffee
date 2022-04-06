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
              to="/order-history"
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
            <Link
              to="/menu-drink"
              className="sidebar__item-link"
              onClick={() => props.setShow(!props.show)}
            >
              Menu Drink
            </Link>
          </li>
          {/* <li className="sidebar__item">
            <Link
              to="/table"
              className="sidebar__item-link"
              onClick={() => props.setShow(!props.show)}
            >
              Tables
            </Link>
          </li> */}
          <li className="sidebar__item">
            <Link
              to="/report"
              className="sidebar__item-link"
              onClick={() => props.setShow(!props.show)}
            >
              Report
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
