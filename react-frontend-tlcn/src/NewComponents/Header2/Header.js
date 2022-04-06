import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header2 = (props) => {
  const navigate = useNavigate();
  function Logout() {
    if (localStorage.getItem("tokenBearer")) {
      localStorage.removeItem("tokenBearer");
      navigate("/");
    }
  }
  let pathname = window.location.pathname;

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm navbar-light ">
      <div className="container-fluid">
        <h3 className="text-light me-3">MY COFFEE</h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/home"
                className={"nav-link" + (pathname === "/home" ? " active" : "")}
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/order-history"
                className={
                  "nav-link" + (pathname === "/order-history" ? " active" : "")
                }
                href="#"
              >
                Order
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/menu-drink"
                className={
                  "nav-link" + (pathname === "/menu-drink" ? " active" : "")
                }
                href="#"
              >
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/report"
                className={
                  "nav-link" + (pathname === "/report" ? " active" : "")
                }
                href="#"
              >
                Report
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className={
                  "nav-link" + (pathname === "/profile" ? " active" : "")
                }
                href="#"
              >
                Profile
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <div className="btn btn-outline-danger">Logout</div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header2;
