import axios from "axios";
import "./style.css";
import { useEffect, useState } from "react";
import Header2 from "../../Components/Header2/Header";
import Loading from "../../Components/Loading";

import checkPermesion from "../../Components/checkPermession";
import { useNavigate } from "react-router-dom";

const ShiftAdmin = () => {
  const tokenBearer = localStorage.getItem("tokenBearer");
  const [loading, setLoading] = useState(true);
  const [dataShift, setDataShift] = useState(null);
  const [selectShift, setSelectShift] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [selectOrigin, setSelectOrigin] = useState(null);

  const [date1, setDate1] = useState({
    from: "2022-04-02",
    to: new Date().toISOString().split("T")[0],
  });

  // const [loadingDetail, setLoadingDetail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = checkPermesion(["ADMIN"]);
    if (check === null) navigate("/login");
    else if (!check) navigate("/404");
    setLoading(false);
    getListShift();
  }, []);

  const getListShift = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/workshift/dates",
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
      params: { dateFrom: date1.from, dateTo: date1.to },
    })
      .then((response) => {
        setOrigin(response.data);
        let copy = JSON.parse(JSON.stringify(response.data));
        copy.result.map((e, i) => {
          copy.result[i].checkin =
            fotmatDDMMYY(e.checkin) + " " + fotmatHHMM(e.checkin);
          copy.result[i].checkout =
            fotmatDDMMYY(e.checkout) + " " + fotmatHHMM(e.checkout);
        });
        setDataShift(response.data);
      })
      .catch((e) => {
        setDataShift(null);
        setOrigin(null);
        console.log(e);
        if (e.response && e.response.status == "401") {
          alert("Hết hạn đăng nhập, xin đăng nhập lại");
          localStorage.removeItem("tokenBearer");
          localStorage.removeItem("coffeeRole");
          navigate("/login");
        }
      });
  };

  function fotmatDDMMYY(date) {
    if (date == undefined) return "";
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    return newdate;
  }

  function fotmatHHMM(date) {
    if (date == undefined) return "";
    var dateObj = new Date(date);
    var hour = dateObj.getHours();
    if (hour < 10) hour = "0" + hour;
    var min = dateObj.getMinutes();
    if (min < 10) min = "0" + min;
    var newdate = hour + ":" + min;
    return newdate;
  }

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  function getEmloyee(employeeId) {
    setSelectShift((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    }));
    axios({
      method: "get",
      url: "http://localhost:5000/api/users/" + employeeId,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setSelectShift((prev) => ({
          ...prev,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          email: response.data.email,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const removeShift = () => {
    console.log(selectOrigin);
    selectOrigin.valid = false;
    axios
      .put(
        "http://localhost:5000/api/workshift/" + selectShift._id,
        selectOrigin,
        {
          headers: {
            Authorization: `bearer ${tokenBearer}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("Delete workshift successfully");
        getListShift();
      })
      .catch((e) => {
        alert("Workshift not found!");
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
            <h1 className="text-center">Quản lý ca làm</h1>
            <div className="text-center">
              <h6 className="text-center">Chọn ngày hiển thị:</h6>
              From:
              <input
                className="me-3"
                type="date"
                value={date1.from}
                onChange={(e) =>
                  setDate1((prev) => ({
                    ...prev,
                    from: e.target.value,
                  }))
                }
              />
              To:
              <input
                type="date"
                value={date1.to}
                onChange={(e) =>
                  setDate1((prev) => ({ ...prev, to: e.target.value }))
                }
              />
              <div className="w-100">
                <div
                  className="btn btn-primary m-1"
                  onClick={() => getListShift()}
                >
                  Xem
                </div>
              </div>
            </div>

            {dataShift !== null && (
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Checkin</th>
                    <th scope="col">Checkout</th>
                    <th scope="col">Số Order</th>
                    <th scope="col">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {dataShift.result.map((e, i) => (
                    <tr>
                      <td>{i}</td>
                      <td>{e.checkin}</td>
                      <td>{e.checkout}</td>
                      <td>{e.countOrder}</td>
                      <td>
                        <button
                          className="btn btn-primary text-light p-1"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#detail"
                          onClick={() => {
                            setSelectOrigin(origin.result[i]);
                            setSelectShift(e);
                            getEmloyee(e.employee);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={20}
                          >
                            <path
                              fill="#ffffff"
                              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
      <div
        class="modal fade"
        id="detail"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content ">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Chi tiết ca làm
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center">
              {selectShift !== null && (
                <div className="row g-3">
                  <div className="col-12">
                    <div className="input-group has-validation">
                      <span className="input-group-text">ID:</span>
                      <input
                        type="text"
                        className="form-control"
                        value={selectShift._id}
                        readOnly
                      />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Checkin
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={selectShift.checkin}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Checkout
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={selectShift.checkout}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Cash
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={currencyFormat(selectShift.cash)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Online
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={currencyFormat(selectShift.online)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={selectShift.firstName}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={selectShift.lastName}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={selectShift.phone}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Mail
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={selectShift.email}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="firstName" className="form-label">
                      Note
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={selectShift.note}
                    />
                  </div>
                </div>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="newtable__btn  newtable__btn--cancle bg-danger"
                data-bs-dismiss="modal"
                onClick={() => removeShift()}
              >
                Xóa ca
              </button>
              <button
                type="button"
                className="newtable__btn newtable__btn--cancle"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftAdmin;
