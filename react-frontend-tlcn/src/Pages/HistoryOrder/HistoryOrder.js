import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteOrder from "../../Components/Modal/History Order/Delete Order/DeleteOrder";
import ViewOrder from "../../Components/Modal/History Order/View Order/ViewOrder";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";
import "./HistoryOrder.css";
import Footer from "../../Components/Footer/Footer";
import Header2 from "../../Components/Header2/Header";

function HistoryOrder() {
  //Set Modal Active
  const [viewModal, setViewModal] = useState(true);
  const [getRole, setRole] = useState(localStorage.getItem("coffeeRole"));
  const [selectedButt, setButt] = useState("");
  const [viewID, setID] = useState("");
  const [selectOrder, setOrder] = useState("");
  const callbackModal = (modalState) => {
    setViewModal(modalState);
  };
  const tokenBearer = localStorage.getItem("tokenBearer");
  const [viewList, setList] = useState([{ phone: 0, name: "", total: 0 }]);
  const [requestData, setRequestData] = useState(new Date());
  const [remove0, setRemove0] = useState(false);
  const [editedOrder, setEditedOrder] = useState([
    { Order_id: 0, Order_name: "loading" },
  ]);
  const [more, setMore] = useState({ pagesize: 20, page: 1, hasMore: true });

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/order?page=${more.page}&pagesize=${more.pagesize}`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setList(response.data.orders);
      if (response.data.orders.length < more.pagesize)
        setMore((prev) => ({ ...prev, hasMore: false }));
    });
  }, [requestData]);

  function saveOrder(ordId) {
    axios({
      method: "get",
      url: `http://localhost:5000/api/order/${ordId}`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setEditedOrder(response.data);
    });
  }

  //Lấy Data theo ID
  function searchoOrderID() {
    if (viewID !== "") {
      axios({
        method: "get",
        url: `http://localhost:5000/api/order/${viewID}`,
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log(response.data);
        setList([response.data]);
      }).catch(()=> alert("Không tìm thấy"))
    } else {
      axios({
        method: "get",
        url: `http://localhost:5000/api/order/?pagesize=100`,
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log(response.data.orders[0]);
        setList(response.data.orders.reverse());
      });
    }
  }

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }

  function formattedDate(date) {
    var dateObj = new Date(date);
    if (isNaN(dateObj)) return "?";

    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    return newdate;
  }

  const fetchMore = () => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/order?page=${more.page + 1}&pagesize=${
        more.pagesize
      }`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setMore((prev) => {
        if (response.data.orders.length < more.pagesize)
          return { ...prev, page: prev.page + 1, hasMore: false };
        else return { ...prev, page: prev.page + 1 };
      });
      setList((prev) => {
        return prev.concat(response.data.orders.reverse());
      });
    });
  };
  return (
    <>
      <Header2 />
      <div className="container p-3">
        <h1 className="text-center">History Order </h1>
        <div className="historyorder">
          <div className="historyorder__top">
            <div className="historyorder__orderid">
              <input
                type="text"
                className=" historyorder__orderid-input"
                id="orderid"
                name="orderid"
                placeholder="   
                        Order ID"
                value={viewID}
                onChange={(e) => setID(e.target.value)}
              />
              <div
                className="btn btn-outline-dark mb-2"
                onClick={() => searchoOrderID()}
              >
                <AiIcons.AiOutlineSearch />
              </div>
            </div>
            <div className="historyorder__orderid user-select-none">
              <input
                id="rm"
                type="checkbox"
                className="m-2"
                onChange={(e) => setRemove0(e.target.checked)}
              />
              <label htmlFor="rm" className="pointer">
                Hide Total = 0
              </label>
            </div>
          </div>
          <div className="historyorder__table-header">
            <table className="historyorder__table"></table>
          </div>
          <div className="historyorder__detail">
            <div className="historyorder__table-content">
              <table className="historyorder__table text-center">
                <thead className="historyorder__head">
                  <tr className="historyorder__header">
                    <th className="col-1 ">No.</th>
                    <th className="col-2">Table</th>
                    <th>Total</th>
                    <th>Created</th>
                    {/* <th className="col-1 d-none d-md-table-cell">Pay</th>
                    <th className="col-1 d-none d-md-table-cell">State</th> */}
                    <th className="col-3 col-md-2">Action</th>
                  </tr>
                </thead>
                <tbody className="historyorder__body">
                  {viewList.map((data, index) =>
                    viewList.length - 1 === index &&
                    more.hasMore &&
                    viewList.length !== 1 ? (
                      <tr className="w-100 ">
                        <td colSpan={5}>
                          <div
                            className="btn btn-outline-dark m-1"
                            onClick={() => fetchMore()}
                          >
                            Fetch more
                          </div>
                        </td>
                      </tr>
                    ) : (
                      ((remove0 && data.total != 0) || !remove0) && (
                        <tr
                          className={
                            "historyorder__row " +
                            (data.payment !== undefined && data.payment.status
                              ? " bg-green-faded"
                              : "")
                          }
                        >
                          <td className="col-1">{index + 1}</td>
                          <td>{data.table}</td>
                          <td>{currencyFormat(data.total)} </td>
                          <td>{formattedDate(data.created)} </td>
                          {/* <td className="text-light d-none d-md-table-cell">
                          {data.payment !== undefined && data.payment.status ? (
                            <span className="bg-success">✓</span>
                          ) : (
                            <span className="bg-danger ">✗</span>
                          )}
                        </td>
                        <td className="text-light d-none d-md-table-cell">
                          {data.status ? (
                            <span className="bg-success">✓</span>
                          ) : (
                            <span className="bg-danger">✗</span>
                          )}
                        </td> */}
                          <td>
                            <button
                              className="btn btn-success text-light  p-1 me-1"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => {
                                setButt("viewcustomer");
                                saveOrder(data._id);
                              }}
                            >
                              <GrIcons.GrCircleInformation className="d-flex align-content-center flex-wrap" />
                            </button>
                            {getRole === "ADMIN" && (
                              <button
                                className={
                                  "btn btn-danger text-light p-1 " +
                                  (data.status == true ? "" : "disabled")
                                }
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  setButt("cancelorder");
                                  setOrder(data._id);
                                  console.log(data);
                                }}
                              >
                                <GiIcons.GiCancel className="d-flex align-content-center flex-wrap" />
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
                  Thông tin Order
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-center">
                {selectedButt === "cancelorder" ? (
                  <DeleteOrder
                    ModalState={callbackModal}
                    orderId={selectOrder}
                    setRequestData={setRequestData}
                  />
                ) : (
                  <ViewOrder
                    ModalState={callbackModal}
                    editedOrder={editedOrder}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryOrder;
