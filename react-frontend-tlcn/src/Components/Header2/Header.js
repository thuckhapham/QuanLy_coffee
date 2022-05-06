import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header2 = (props) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("coffeeRole"));
  const [checkin, setCheckin] = useState(localStorage.getItem("checkin"));
  function Logout() {
    // if (localStorage.getItem("checkin") !== null)
    //   alert("Bạn chưa checkout, hãy checkout trước khi login");
    // else
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
    setCheckin(localStorage.getItem("checkin"));
  }, [pathname]);

  const ViewCheckOut = () => {
    let data = localStorage.getItem("checkin"); // put to api
    setCheckin(JSON.parse(data));
  };

  const UserCheckOut = () => {
    // put data api
    console.log(checkin);
    // xong rồi remove
    localStorage.removeItem("checkin");
    setCheckin(null);
    alert("Đã checkout thành công");
  };
  const UserCheckIn = () => {
    // call api
    let responseId = "fsd86xcrr999";
    localStorage.setItem(
      "checkin",
      JSON.stringify({
        _id: responseId,
        cash: 0,
        online: 0,
        countOrder: 0,
        note: "",
      })
    );
    setCheckin({
      _id: responseId,
      cash: 0,
      online: 0,
      note: "",
    });

    alert("Đã checkin thành công");
  };

  function currencyFormat(num) {
    return (
      parseInt(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
    );
  }

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
              <Link to="/track" className={"nav-link"} target="_blank">
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
            <div className="d-flex">
              {checkin == null ? (
                <div className="btn btn-outline-warning" onClick={UserCheckIn}>
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
              <div className="ms-1 btn btn-outline-danger" onClick={Logout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
      {/* MODAL CHECKOUT */}
      {checkin !== null && (
        <div
          class="modal fade"
          id="checkout"
          tabindex="-1"
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
                      <th scope="col">ID ca làm: </th>
                      <th scope="col">Tiền thu được</th>
                      <th scope="col">Tiền mặt</th>
                      <th scope="col">Thanh toán online</th>
                      <th scope="col">Tổng số order đã thực hiện</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{checkin._id}</td>
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
    </nav>
  );
};

export default Header2;
