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
  return (
    <>
      <div className="checkout">
        <div className="checkout__title">
          <strong>
            {" "}
            Bill number:{" "}
            <input type="text" value={props.editedOrder._id} readOnly />
          </strong>
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
        
      </div>
    </>
  );
}

export default OrderInfo;
