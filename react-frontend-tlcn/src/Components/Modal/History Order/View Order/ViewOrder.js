import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewOrder.css";

function OrderInfo(props) {
  const sendData = (modalState) => {
    props.ModalState(modalState);
  };
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  const [viewList, setList] = useState([
    { customer_id: 0, customer_name: "loading" },
  ]);
  const [orderList, setOrder] = useState([{ customer_id: 0, price: 0 }]);
  useEffect(() => {
    console.log(props.editedOrder._id);
    axios({
      method: "get",
      url: `http://localhost:5000/api/order/${props.editedOrder._id}`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setList(response.data);
        if (response.data.orderItem) {
          setOrder(response.data.orderItem);
        }
      })
      .catch((error) => {
        console.log("Error");
      });
  }, [props.editedOrder._id]);
  // Quy tiền
  function currencyFormat(num) {
    if (num) {
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
    } else {
      return "0 đ";
    }
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

  return (
    <>
      <div className="checkout">
        <div className="checkout__title">
          <strong>
            {" "}
            Bill number:{" "}
            <input type="text" value={props.editedOrder._id} readOnly />
            {/* {JSON.stringify(props.editedOrder)} */}
          </strong>
          <p className="m-0">
            Created: {formattedDate(props.editedOrder.created)} {"  "}
            Updated:{formattedDate(props.editedOrder.updated)}
          </p>
        </div>
        <div className="checkout__table-header">
          <table className="checkout__table">
            <thead className="checkout__head">
              <tr className="checkout__header">
                <th>Id</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="checkout__detail">
          <div className="checkout__table-content">
            <table className="checkout__table">
              <tbody className="checkout__body">
                {orderList.map((detail, index) => (
                  <tr className="checkout__row">
                    <td>{index + 1}</td>
                    <td>{detail.name}</td>
                    <td>{detail.quantity}</td>
                    <td>{currencyFormat(detail.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="checkout__total">
          Total: {currencyFormat(viewList.total)}
          <br />
        </div>
        <div>
          <div className="me-1 text-dark d-inline-block">
            PAYMENT:{" "}
            {props.editedOrder.payment !== undefined &&
            props.editedOrder.payment.status ? (
              <span className="bg-success">✓</span>
            ) : (
              <span className="bg-danger ">✗</span>
            )}
          </div>
          |
          <div className="ms-1 text-dark d-inline-block">
            STATUS:{" "}
            {props.editedOrder.status ? (
              <span className="bg-success">✓</span>
            ) : (
              <span className="bg-danger">✗</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderInfo;
