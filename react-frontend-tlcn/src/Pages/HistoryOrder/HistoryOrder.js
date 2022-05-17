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
  const [selectedButt, setButt] = useState("");
  const callbackModal = (modalState) => {
    setViewModal(modalState);
  };
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");

  // Lấy dữ liệu order
  const [viewList, setList] = useState([{ phone: 0, name: "", total: 0 }]);
  const [requestData, setRequestData] = useState(new Date());
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/order/?pagesize=100`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setList(response.data.orders.reverse());
    });
  }, [requestData]);
  //Save Order Data to array
  const [editedOrder, setEditedOrder] = useState([
    { Order_id: 0, Order_name: "loading" },
  ]);
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
  //Xóa order
  const [selectOrder, setOrder] = useState("");
  //Lấy Data theo ID
  const [viewID, setID] = useState("");
  function orderID() {
    if (viewID) {
      axios({
        method: "get",
        url: `http://localhost:5000/api/order/${viewID}`,
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setList([response.data]);
      });
    } else {
      axios({
        method: "get",
        url: `http://localhost:5000/api/order/?pagesize=100`,
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setList(response.data.orders.reverse());
      });
    }
  }
  // Hủy order
  function cancelOrder(id) {
    if (id) {
      axios({
        method: "delete",
        url: `http://localhost:5000/api/order/${id}`,
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then(() => {
        setRequestData(new Date());
      });
    }
  }
  //Quy đổi số về tiền việt
  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }
  function formattedDate(date) {
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    return newdate;
  }
  return (
    <>
      <Header2 />
      <div className="container p-3">
        <h1 className="text-center">History Order</h1>
        <div className="historyorder">
          <div className="historyorder__top">
            <div className="historyorder__orderid">
              <input
                type="text"
                className="historyorder__orderid historyorder__orderid-input"
                id="orderid"
                name="orderid"
                placeholder="   
                        Order ID"
                value={viewID}
                onChange={(e) => setID(e.target.value)}
              />
              <div className="btn btn-outline-dark mb-2">
                <AiIcons.AiOutlineSearch onClick={() => orderID()} />
              </div>
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
                    <th className="col-1 d-none d-md-table-cell">No.</th>
                    <th className="col-2">Table</th>
                    <th>Total</th>
                    <th>Time</th>
                    <th className="col-1 d-none d-md-table-cell">Pay</th>
                    <th className="col-1 d-none d-md-table-cell">State</th>
                    <th className="col-3 col-md-2">Action</th>
                    {/* <th style={{ width: 100 }}>No.</th>
                    <th style={{ width: 100 }}>Table</th>
                    <th>Total</th>
                    <th>Time</th>
                    <th style={{ width: 100 }}>Payment</th>
                    <th style={{ width: 100 }}>State</th>
                    <th style={{ width: 150 }}>Action</th> */}
                  </tr>
                </thead>
                <tbody className="historyorder__body">
                  {viewList.map((data, index) => (
                    <tr className="historyorder__row">
                      <td className="col-1 d-none d-md-table-cell">
                        {index + 1}
                      </td>
                      <td>{data.table}</td>
                      <td>{currencyFormat(data.total)} </td>
                      <td>{formattedDate(data.updated)} </td>
                      <td className="text-light d-none d-md-table-cell">
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
                      </td>
                      <td>
                        <button
                          className="bg-success text-light  p-1 me-1"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setButt("viewcustomer");
                            // setViewModal(!viewModal);
                            saveOrder(data._id);
                          }}
                        >
                          <GrIcons.GrCircleInformation className="d-flex align-content-center flex-wrap" />
                        </button>
                        <button
                          className="bg-danger text-light p-1"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setButt("cancelorder");
                            // setViewModal(!viewModal);
                            setOrder(data._id);
                            console.log(data);
                          }}
                        >
                          {/* Cancel */}
                          <GiIcons.GiCancel className="d-flex align-content-center flex-wrap" />
                        </button>
                      </td>
                    </tr>
                  ))}
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
                  Modal title
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
              <div class="modal-footer">
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
      <Footer />
    </>
  );
}

export default HistoryOrder;
