import React, { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header2 from "../../Components/Header2/Header";
import Footer from "../../Components/Footer/Footer";
import QRCode from "react-qr-code";
import sound from "./audio/ok.mp3";

let loicaiconcac = {};
function Homepage(props) {
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  //Lấy Data
  const [requestData, setRequestData] = useState(new Date());
  const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);

  //new eidt
  const [selectedTable, setSelectedTable] = useState(undefined);
  const [activeTable, setActiveTable] = useState(-1);
  const [orderDetail, setOrderDetail] = useState({});
  const [timeCount, setTimeCount] = useState(null);
  const [rerender, setRerender] = useState(0);
  const [longTime, setLongTime] = useState({});
  const [playing, toggle] = useAudio(sound);
  const [startCount, setStat] = useState(0);

  useEffect(() => {
    if (
      selectedTable !== undefined &&
      (selectedTable.status === "WAIT" || selectedTable.status === "COMPLETE")
    )
      axios({
        method: "get",
        url: "http://localhost:5000/api/table/" + selectedTable.tablePoin,
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setOrderDetail({ orderId: res.data.ordersId });
      });
    else setOrderDetail({});
  }, [selectedTable]);

  function toHHMMSS(num, table) {
    var sec_num = parseInt(num, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    // if (parseInt(seconds) > 7) {
    //   let a = {};
    //   a[table] = true;
    //   console.log("Long time")
    //   // setLongTime((prev) => ({ ...prev, ...a }));
    // }
    if (hours == "00") return minutes + ":" + seconds;
    else return hours + ":" + minutes + ":" + seconds;
  }

  // useEffect(() => {
  //   // settime out fix loi localsttrore chua kip luu

  // }, [updateLocalStore]);

  const getTimeCount = (time) => {};

  // const removeCount = (table) => {
  //   let timetable = localStorage.getItem("timeTable");
  //   if (timetable == undefined) {
  //   } else {
  //     timetable = JSON.parse(timetable);
  //     delete timetable[table];
  //     localStorage.setItem("timeTable", JSON.stringify(timetable));
  //     setUpdateLocalState((prev) => prev + 1);
  //   }
  // };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/table?page=1&pagesize=100`)
      .then((response) => {
        console.log(response.data);
        response.data.tables.sort((a, b) => a.tablePoin - b.tablePoin);
        setList(response.data.tables);
        setStat((prev) => prev + 1);
      });
  }, [requestData]);

  useEffect(() => {
    if (startCount > 0) {
      console.log("STARTTTTTTTTTTTTTTTTTT");
      let newTime = {};
      let longgg = {};
      console.log(viewList);
      viewList.map((e, i) => {
        if (e.status == "WAIT") {
          let timestring = (Date.now() - parseInt(e.updated)).toString();
          let x = timestring.substring(0, timestring.length - 3);
          newTime[e.tablePoin] = x;
          if (parseInt(x) > 300) longgg[e.tablePoin] = true;
          else longgg[e.tablePoin] = false;
        }
      });
      console.log(newTime);
      //
      let a = setInterval(() => {
        Object.keys(newTime).forEach(function (key) {
          let x = (parseInt(newTime[key]) + 1).toString();
          newTime[key] = x;
          if (parseInt(x) > 300) longgg[key] = true;
          else longgg[key] = false;
        });
        setTimeCount(newTime);
        setRerender((res) => res + 1);
        setLongTime(longgg);
      }, 1000);
      //
      return () => {
        clearInterval(getTimeCount(a));
      };
    }
  }, [startCount]);

  // useEffect(() => {
  //   console.log("START");
  //   let newTime = {};
  //   let a = setInterval(() => {
  //     newTime[2] = Date.now();
  //     console.log(newTime);
  //     setTimeCount(newTime);
  //   }, 1000);
  //   return () => {
  //     clearInterval(getTimeCount(a));
  //   };
  // }, []);

  //Set Modal Active
  const [viewModal, setViewModal] = useState(true);
  //Default new table
  const [selectedName, setName] = useState("");
  // Thêm bàn mới
  function addingTable(selectedName) {
    axios({
      method: "post",
      url: "http://localhost:5000/api/table/",
      data: {
        tablePoin: "TA-" + selectedName,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        orderTable("TA-" + selectedName);
        setRequestData(new Date());
        setName("");
      })
      .catch((e) => {
        if (e.response.status) alert("Lỗi: Đã tồn tại bàn: " + selectedName);
      });
  }
  // Order
  const navigate = useNavigate();
  function orderTable(table) {
    axios({
      method: "post",
      url: "http://localhost:5000/api/order",
      data: {
        table: table,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      //   alert(JSON.stringify(response.data));
      if (response.data._id) {
        navigate("/order/" + response.data._id);
      } else {
        console.log("Error");
      }
    });
  }

  const UpdateStatus = (to) => {
    axios({
      method: "post",
      url:
        "http://localhost:5000/api/table/" +
        selectedTable.tablePoin +
        "/status",
      data: {
        tableStatus: to,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (to == "COMPLETE") toggle();

      setSelectedTable(undefined);
      setActiveTable(-1);
      setRequestData(new Date());
    });
  };

  const removeTable = () => {
    axios({
      method: "delete",
      url: "http://localhost:5000/api/table/" + selectedTable.tablePoin,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setRequestData(new Date());
    });
  };

  const removeTakeAway = () => {
    axios({
      method: "delete",
      url:
        "http://localhost:5000/api/table/takeaway/" + selectedTable.tablePoin,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setRequestData(new Date());
    });
  };

  const getDetailOrder = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/order/" + orderDetail.orderId,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setOrderDetail({ ...orderDetail, data: res.data });
    });
  };

  return (
    <>
      <Header2 />
      <div className="container p-3">
        <ul className="w-100">
          <li>
            <span className="dot table-available d-inline-block"></span>: Bàn
            trống
          </li>
          <li>
            <span className="dot table-used d-inline-block"></span>: Chờ pha chế
          </li>
          <li>
            <span className="dot table-broken d-inline-block"></span>: Hoàn
            thành
          </li>
        </ul>

        <h3>Tầng 1:</h3>
        <div className="row justify-content-center text-center">
          {viewList.slice(0, 10).map((data, i) => (
            <div className="col-4 col-sm-3 col-lg-2 col-xl-1 col mt-1 mb-1 ">
              <button
                className={
                  "homepage__order-link d-block mx-auto " +
                  (i === activeTable && "table-active-border") +
                  " " +
                  (data.status === "INIT"
                    ? "table-available"
                    : data.status === "WAIT"
                    ? "table-used text-light "
                    : "table-broken")
                }
                // onClick={() => orderTable(data.tablePoin)}
                onClick={() => {
                  setSelectedTable(data);
                  setActiveTable(i);
                }}
                data-bs-toggle="modal"
                data-bs-target="#infotable"
              >
                {data.tablePoin}
              </button>
              <div
                className={
                  longTime[data.tablePoin] ? " text-danger fw-bold" : ""
                }
              >
                {data.status == "WAIT" && timeCount
                  ? toHHMMSS(timeCount[data.tablePoin], data.tablePoin)
                  : ""}
              </div>
            </div>
          ))}
        </div>
        <hr />
        {/* {JSON.stringify(longTime)} */}

        <h3>Tầng 2:</h3>
        <div className="row justify-content-center text-center">
          {viewList.slice(10, 20).map((data, i) => (
            <div className="col-4 col-sm-3 col-lg-2 col-xl-1 mt-1 mb-1">
              <button
                className={
                  "homepage__order-link d-block " +
                  (i === activeTable && "table-active-border") +
                  " " +
                  (data.status === "INIT"
                    ? "table-available"
                    : data.status === "WAIT"
                    ? "table-used text-light "
                    : "table-broken")
                }
                // onClick={() => orderTable(data.tablePoin)}
                onClick={() => {
                  setSelectedTable(data);
                  setActiveTable(i);
                }}
                data-bs-toggle="modal"
                data-bs-target="#infotable"
              >
                {data.tablePoin}
              </button>
              {data.status == "WAIT" && timeCount
                ? toHHMMSS(timeCount[data.tablePoin], data.tablePoin)
                : ""}
            </div>
          ))}
        </div>
        <hr />

        <h3>
          Take away:{" "}
          <button
            type="button"
            className="homepage__btn-add mb-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            + CREATE TAKEAWAY
          </button>
        </h3>

        <div className="row  justify-content-center text-center">
          {viewList.slice(20, viewList.length).map((data, i) => (
            <div className="col-4 col-sm-3 col-lg-2 col-xl-1 mt-1 mb-1">
              <button
                className={
                  "homepage__order-link d-block " +
                  (i === activeTable && "table-active-border") +
                  " " +
                  (data.status === "INIT"
                    ? "table-available"
                    : data.status === "WAIT"
                    ? "table-used text-light "
                    : "table-broken")
                }
                // onClick={() => orderTable(data.tablePoin)}
                onClick={() => {
                  setSelectedTable(data);
                  setActiveTable(i);
                }}
                data-bs-toggle="modal"
                data-bs-target="#infotable"
              >
                {data.tablePoin}
              </button>
              {data.status == "WAIT" && timeCount
                ? toHHMMSS(timeCount[data.tablePoin], data.tablePoin)
                : ""}
            </div>
          ))}
        </div>
        {/* {JSON.stringify(loicaiconcac)} */}

        {/* Modal CREATE TABLE */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Tạo bàn mới
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-center">
                {" "}
                <div className="m-0">
                  <div className="newtable__content-header m-0">
                    CREATING NEW TABLE
                  </div>
                  <div className="newtable__content-list">
                    <div className="newtable__content-item">
                      <div
                        className="btn btn-dark"
                        onClick={() => {
                          setName(Math.floor(Math.random() * 900 + 100));
                        }}
                      >
                        Ramdom Table
                      </div>
                      <div className="newtable__input mt-2">
                        TA-
                        <input
                          id="tablePoint"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          value={selectedName}
                          type="string"
                          className="newtable__form"
                          placeholder="TablePoint"
                        />
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
                  className={"newtable__btn newtable__btn--add"}
                  disabled={selectedName !== "" ? false : true}
                  onClick={() => {
                    addingTable(selectedName);
                    setViewModal(!viewModal);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL INFO TABLE */}
        <div
          class="modal fade"
          id="infotable"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Thông tin bàn
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-center">
                {selectedTable === undefined ? (
                  <p className="text-center">Chọn một bàn để xem</p>
                ) : (
                  <>
                    <ul className="p-0 text-center">
                      <li className="">
                        <h3> Thông tin bàn: {selectedTable.tablePoin}</h3>
                      </li>
                      {/* <li>
                        Trạng thái:
                        <select
                          className="ms-1"
                          value={selectedTable.status}
                          onChange={(e) => {
                            setSelectedTable((prev) => ({
                              ...prev,
                              status: e.target.value,
                            }));
                            UpdateStatus(e.target.value);
                          }}
                          disabled
                        >
                          <option value={"INIT"}>Chưa có Order</option>
                          <option value={"WAIT"}>Chờ pha chế</option>
                          <option value={"DELIVERED"}>Đã giao nước</option>
                        </select>
                      </li> */}
                      {/* <li>______________________</li> */}
                      <li>
                        {selectedTable.status === "INIT" ? (
                          <>
                            <div
                              className="homepage__btn-add d-inline-block ms-1"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() =>
                                orderTable(selectedTable.tablePoin)
                              }
                            >
                              Đặt đơn
                            </div>
                            {selectedTable.tablePoin.includes("TA") && (
                              <div
                                className="newtable__btn newtable__btn--cancle d-inline-block ms-1 "
                                onClick={() => removeTakeAway()}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                Xóa
                              </div>
                            )}
                          </>
                        ) : selectedTable.status === "WAIT" ? (
                          <>
                            <div
                              className="homepage__btn-add d-inline-block ms-1"
                              onClick={() => {
                                UpdateStatus("COMPLETE");
                                // removeCount(selectedTable.tablePoin);
                              }}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Đã pha xong
                            </div>
                          </>
                        ) : selectedTable.tablePoin.includes("TA") ? (
                          <div
                            className="homepage__btn-add d-inline-block ms-1"
                            onClick={() => removeTakeAway()}
                            // Click vô đây thì xóa thiệt
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Giao cho khách
                          </div>
                        ) : (
                          <div
                            className="homepage__btn-add d-inline-block ms-1"
                            onClick={() => removeTable()}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Dọn bàn
                          </div>
                        )}
                      </li>
                      <li>
                        {orderDetail.orderId !== undefined ? (
                          <div className="pt-1">
                            <div
                              className="btn btn-warning"
                              onClick={() => getDetailOrder()}
                            >
                              Chi tiết đơn
                            </div>
                            {orderDetail.data !== undefined && (
                              <table className="order__table mt-1">
                                <thead className="order__head">
                                  <tr className="order__header">
                                    <th>Name</th>
                                    <th>Quantity</th>
                                  </tr>
                                </thead>
                                <tbody className="order__body">
                                  {orderDetail.data.orderItem.map((e) => (
                                    <tr className="order__row">
                                      <td>{e.name}</td>
                                      <td>{e.quantity}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </li>
                      <li></li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default Homepage;
