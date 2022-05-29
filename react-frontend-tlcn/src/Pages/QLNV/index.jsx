import axios from "axios";
import "./style.css";
import { useEffect, useState } from "react";
import Header2 from "../../Components/Header2/Header";
import Loading from "../../Components/Loading";

import checkPermesion from "../../Components/checkPermession";
import { useNavigate } from "react-router-dom";

const QLNV = () => {
  const tokenBearer = localStorage.getItem("tokenBearer");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [selectUser, setSelectUser] = useState(undefined);
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    updated: "",
    role: "USER",
  });

  const [loadingUser, setLoadingUser] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const check = checkPermesion(["ADMIN"]);
    if (check === null) navigate("/login");
    else if (!check) navigate("/404");
    setLoading(false);
    getListUser();
  }, []);

  const getListUser = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/users/",
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status == "401") {
          alert("Hết hạn đăng nhập, xin đăng nhập lại");
          localStorage.removeItem("tokenBearer");
          localStorage.removeItem("coffeeRole");
          navigate("/login");
        }
      });
  };
  const createUser = () => {
    console.log(newUser);
    axios({
      method: "post",
      url: "http://localhost:5000/api/users/",
      data: newUser,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        getListUser();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const selectU = (_id) => {
    // setSelectUser(_id);
    setLoadingUser(true);
    axios({
      method: "get",
      url: "http://localhost:5000/api/users/" + _id,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        let a = {
          userName: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phone: "",
          updated: "",
          role: "USER",
        };
        a = response.data;
        setSelectUser(a);
        setLoadingUser(false);
      })
      .catch((e) => {
        console.log(e);
        setLoadingUser(false);
      });
  };

  const updateU = () => {
    axios({
      method: "put",
      url: "http://localhost:5000/api/users/" + selectUser._id,
      data: selectUser,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setSelectUser(response.data);
        getListUser();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Header2 />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container p-3">
            {/* <h1 className="text-center">QLNV</h1> */}
            <button
              type="button"
              className="homepage__btn-add mx-auto d-block"
              data-bs-toggle="modal"
              data-bs-target="#create"
            >
              + CREATE USER
            </button>
            <div className="border border-4  mb-3 mt-2 p-2">
              <table class="table  table-hover ">
                <thead>
                  <tr>
                    <th scope="col">UserName</th>
                    {/* <th scope="col">Email</th> */}
                    <th scope="col">FName</th>
                    <th scope="col">LName</th>
                    <th scope="col">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((e, i) => (
                    <tr
                      className={
                        "user-row" +
                        (selectUser && selectUser._id == e._id
                          ? " bg-faded "
                          : "")
                      }
                      onClick={() => selectU(e._id)}
                      data-bs-toggle="modal"
                      data-bs-target="#detail"
                    >
                      <td>{e.userName}</td>
                      {/* <td>{e.email}</td> */}
                      <td>{e.firstName}</td>
                      <td>{e.lastName}</td>
                      <td>{e.created.split("T")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                class="modal fade"
                id="detail"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content ">
                    <div class="modal-header p-3">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Chi tiết nhân viên
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    {selectUser != undefined ? (
                      <div class="modal-body text-center p-2">
                        <div className="newtable__input  ">
                          <label>ID: </label>
                          <input
                            value={selectUser._id}
                            type="text"
                            className="newtable__form"
                            disabled
                          />
                          <label>USERNAME: </label>
                          <input
                            onChange={(e) => {
                              setSelectUser((prev) => ({
                                ...prev,
                                userName: e.target.value,
                              }));
                            }}
                            value={selectUser.userName}
                            type="text"
                            className="newtable__form"
                            placeholder="userName"
                          />
                          <label>NEW PASSWORD: </label>
                          <input
                            onChange={(e) => {
                              setSelectUser((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }));
                            }}
                            value={selectUser.password}
                            type="password"
                            className="newtable__form"
                            placeholder="New password here"
                          />
                          <label>PHONE: </label>
                          <input
                            onChange={(e) => {
                              setSelectUser((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }));
                            }}
                            value={selectUser.phone ? selectUser.phone : ""}
                            type="number"
                            className="newtable__form"
                            placeholder="phone"
                          />
                          <label>EMAIL: </label>
                          <input
                            onChange={(e) => {
                              setSelectUser((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }));
                            }}
                            value={selectUser.email ? selectUser.email : ""}
                            type="text"
                            className="newtable__form"
                            placeholder="email"
                          />
                          <label>FIRST NAME: </label>
                          <input
                            onChange={(e) => {
                              setSelectUser((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }));
                            }}
                            value={
                              selectUser.firstName ? selectUser.firstName : ""
                            }
                            type="text"
                            className="newtable__form"
                            placeholder="FNAME"
                          />
                          <label>LAST NAME: </label>
                          <input
                            onChange={(e) => {
                              setSelectUser((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }));
                            }}
                            value={
                              selectUser.lastName ? selectUser.lastName : ""
                            }
                            type="text"
                            className="newtable__form"
                            placeholder="LNAME"
                          />
                          <label className="me-1">QUYỀN HẠN: </label>
                          <select
                            value={selectUser.role}
                            onChange={(e) => {
                              setSelectUser((prev) => ({
                                ...prev,
                                role: e.target.value,
                              }));
                            }}
                          >
                            <option value="USER">NHÂN VIÊN</option>
                            <option value="ADMIN">QUẢN LÍ</option>
                          </select>
                        </div>
                        <div className="text-center mt-1">
                          <div
                            className="btn btn-primary"
                            onClick={updateU}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            UPDATE
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Loading />
                    )}
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* MODAL */}
            <div
              class="modal fade"
              id="create"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content ">
                  <div class="modal-header p-3">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Create User
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body text-center p-2">
                    {" "}
                    <div className="m-0">
                      <div className="newtable__content-list">
                        <div className="newtable__content-item">
                          <div className="newtable__input mt-2 ">
                            <label>USERNAME: </label>
                            <input
                              onChange={(e) => {
                                setNewUser((prev) => ({
                                  ...prev,
                                  userName: e.target.value,
                                }));
                              }}
                              value={newUser.userName}
                              type="text"
                              className="newtable__form"
                              placeholder="userName"
                            />
                            <label>PASSWORD: </label>
                            <input
                              onChange={(e) => {
                                setNewUser((prev) => ({
                                  ...prev,
                                  password: e.target.value,
                                }));
                              }}
                              value={newUser.password}
                              type="password"
                              className="newtable__form"
                              placeholder="password"
                            />
                            <label>PHONE: </label>
                            <input
                              onChange={(e) => {
                                setNewUser((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }));
                              }}
                              value={newUser.phone}
                              type="number"
                              className="newtable__form"
                              placeholder="phone"
                            />
                            <label>EMAIL: </label>
                            <input
                              onChange={(e) => {
                                setNewUser((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }));
                              }}
                              value={newUser.email}
                              type="text"
                              className="newtable__form"
                              placeholder="email"
                            />
                            <label>FIRST NAME: </label>
                            <input
                              onChange={(e) => {
                                setNewUser((prev) => ({
                                  ...prev,
                                  firstName: e.target.value,
                                }));
                              }}
                              value={newUser.firstName}
                              type="text"
                              className="newtable__form"
                              placeholder="FNAME"
                            />
                            <label>LAST NAME: </label>
                            <input
                              onChange={(e) => {
                                setNewUser((prev) => ({
                                  ...prev,
                                  lastName: e.target.value,
                                }));
                              }}
                              value={newUser.lastName}
                              type="text"
                              className="newtable__form"
                              placeholder="LNAME"
                            />
                            <label className="me-1">QUYỀN HẠN: </label>
                            <select
                              value={newUser.role}
                              onChange={(e) => {
                                setNewUser((prev) => ({
                                  ...prev,
                                  role: e.target.value,
                                }));
                              }}
                            >
                              <option value="USER">NHÂN VIÊN</option>
                              <option value="ADMIN">QUẢN LÍ</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      className="newtable__btn newtable__btn--cancle"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      data-bs-dismiss="modal"
                      className="newtable__btn newtable__btn--add"
                      onClick={createUser}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QLNV;
