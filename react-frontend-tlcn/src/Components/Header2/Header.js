import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Header.css";

const Header2 = (props) => {
  const tokenBearer = localStorage.getItem("tokenBearer");
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("coffeeRole"));
  const [checkin, setCheckin] = useState(localStorage.getItem("checkin"));
  const [date1, setDate1] = useState({
    from: "2022-04-02",
    to: "2022-05-02",
  });
  const [date2, setDate2] = useState({
    from: "2022-04-02",
    to: "2022-05-02",
  });
  function Logout() {
    // if (localStorage.getItem("checkin") !== null)
    //   alert("Bạn chưa checkout, hãy checkout trước khi login");
    // else
    if (localStorage.getItem("tokenBearer")) {
      localStorage.removeItem("tokenBearer");
      localStorage.removeItem("coffeeRole");
      localStorage.removeItem("fullName");
      navigate("/login");
    }
  }
  let pathname = window.location.pathname;

  useEffect(() => {
    if (localStorage.getItem("coffeeRole") !== role)
      setRole(localStorage.getItem("coffeeRole"));
    setCheckin(localStorage.getItem("checkin"));
  }, [pathname]);

  const ViewCheckOut = () => {
    let data = localStorage.getItem("checkin"); // put to api
    setCheckin(JSON.parse(data));
  };

  const UserCheckOut = () => {
    let check = JSON.parse(localStorage.getItem("checkin"));
    axios({
      method: "put",
      url: "http://localhost:5000/api/workshift/" + check._id + "/checkout",
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
      data: { ...check, note: checkin.note },
    })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("checkin");
        setCheckin(null);
        alert("Đã checkout thành công");
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  };
  const UserCheckIn = () => {
    // call api
    axios({
      method: "post",
      url: "http://localhost:5000/api/workshift/checkin",
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("response: ", response.data);
        localStorage.setItem(
          "checkin",
          JSON.stringify({
            _id: response.data._id,
            cash: 0,
            online: 0,
            countOrder: 0,
            note: "",
          })
        );
        setCheckin(
          JSON.stringify({
            cash: 0,
            online: 0,
            countOrder: 0,
            note: "",
          })
        );
        alert("Đã checkin thành công");
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  };

  function currencyFormat(num) {
    return (
      parseInt(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
    );
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md navbar-light ">
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
                      "nav-link" +
                      (pathname === "/home" || pathname === "/"
                        ? " active"
                        : "")
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
                        User
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/shift"
                        className={
                          "nav-link" + (pathname === "/shift" ? " active" : "")
                        }
                      >
                        Shift
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
              <Link to="/track" className={"nav-link"} target="_blank">
                Tracking
              </Link>
            </li>
            {role == null && (
              <li className="nav-item">
                <Link
                  to="/about"
                  className={
                    "nav-link" + (pathname === "/about" ? " active" : "")
                  }
                >
                  About-MyCofffe
                </Link>
              </li>
            )}
          </ul>
          {role !== null ? (
            <div className="d-flex">
              {checkin == null ? (
                <div
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#checkinmodal"
                >
                  Checkin
                </div>
              ) : (
                <div
                  className="btn btn-outline-warning"
                  onClick={ViewCheckOut}
                  data-bs-toggle="modal"
                  data-bs-target="#checkout"
                >
                  Checkout
                </div>
              )}
              <div
                className="ms-1 btn btn-outline-danger svg-logout"
                onClick={Logout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={15}
                  fill="#dc3545"
                  className="ms-1 "
                >
                  <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="d-flex">
              {" "}
              <Link className="btn btn-outline-warning" to="/login">
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={15}
                  fill="#ffc107"
                  className="ms-1"
                >
                  <path d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* MODAL CHECKOUT */}
      {checkin !== null && (
        <div
          class="modal fade"
          id="checkout"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Bạn muốn checkout?
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body text-center">
                {/* {JSON.stringify(checkin)} */}
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Tiền thu được</th>
                      <th scope="col">Tiền mặt</th>
                      <th scope="col">Thanh toán online</th>
                      <th scope="col">Tổng số order đã thực hiện</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{currencyFormat(checkin.cash + checkin.online)}</td>
                      <td>{currencyFormat(checkin.cash)}</td>
                      <td>{currencyFormat(checkin.online)}</td>
                      <td>{checkin.countOrder}</td>
                    </tr>
                  </tbody>
                </table>
                <input
                  type="text"
                  placeholder="Ghi chú ca làm..."
                  value={checkin.note}
                  onChange={(e) =>
                    setCheckin((prev) => ({ ...prev, note: e.target.value }))
                  }
                />
              </div>
              <div class="modal-footer d-block text-center">
                <div
                  className="btn btn-danger"
                  onClick={UserCheckOut}
                  data-bs-dismiss="modal"
                >
                  CHECKOUT
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL CHECKIN */}
      <div
        class="modal fade"
        id="checkinmodal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content ">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Bạn muốn checkin?
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body text-center">
              <div
                className="btn btn-danger"
                onClick={UserCheckIn}
                data-bs-dismiss="modal"
              >
                CHECKIN
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header2;
