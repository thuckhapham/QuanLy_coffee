import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header2 = (props) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("coffeeRole"));
  function Logout() {
    if (localStorage.getItem("tokenBearer")) {
      localStorage.removeItem("tokenBearer");
      localStorage.removeItem("coffeeRole");
      navigate("/login");
    }
  }
  let pathname = window.location.pathname;

  useEffect(() => {
    if (localStorage.getItem("coffeeRole") !== role)
      setRole(localStorage.getItem("coffeeRole"));
  }, [pathname]);

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
            {role !== null && (
              <>
                <li className="nav-item">
                  <Link
                    to="/home"
                    className={
                      "nav-link" + (pathname === "/home" ? " active" : "")
                    }
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/order-history"
                    className={
                      "nav-link" +
                      (pathname === "/order-history" ? " active" : "")
                    }
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
                  >
                    Menu
                  </Link>
                </li>
                {role === "ADMIN" && (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/report"
                        className={
                          "nav-link" + (pathname === "/report" ? " active" : "")
                        }
                      >
                        Report
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/qlnv"
                        className={
                          "nav-link" + (pathname === "/qlnv" ? " active" : "")
                        }
                      >
                        QLNV
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className={
                      "nav-link" + (pathname === "/profile" ? " active" : "")
                    }
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link to="/track" className={"nav-link"}>
                Client-Track
              </Link>
            </li>
            {role == null && (
              <li className="nav-item">
                <Link to="/about" className={"nav-link"}>
                 About-MyCofffe
                </Link>
              </li>
            )}
          </ul>
          {role !== null && (
            <form className="d-flex">
              <div className="btn btn-outline-danger" onClick={Logout}>
                Logout
              </div>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header2;
