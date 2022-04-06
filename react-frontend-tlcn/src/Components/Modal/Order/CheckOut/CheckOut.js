import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import "./CheckOut.css";

function CheckOut(props) {
  const details = props.orderdetail;
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  //Đóng Modal
  const sendData = (modalState) => {
    props.ModalState(modalState);
  };
  // Quy tiền
  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }
  // Checkout
  const navigate = useNavigate();
  function checkoutOrder(id) {
    axios({
      method: "get",
      url: `http://localhost:5000/api/order/${props.orderid}/checkout`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/table/" + res.data.table + "/status",
        data: {
          tableStatus: "USED",
        },
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        navigate("/homepage");
      });
    });
  }
  // Checkout
  function cancelOrder() {
    axios({
      method: "delete",
      url: `http://localhost:5000/api/order/${props.orderid}`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/homepage");
    });
  }
  return (
    <>
      <div className="checkout">
        <div className="checkout__title">
          <h1>Bill number - #{props.orderid}</h1>
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
                {details.map((detail, index) => (
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
          Total: {props.totalprice}
          <br />
          Discount: {props.discountprice}
        </div>
        <div className="checkout__checkout">Check out: {props.totalprice}</div>
        <div className="checkout__payment">
          <ul className="checkout__payment-list">
            <li className="checkout__payment-item">
              <label className="payment__rb">
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
                <span className="icon">
                  <FaIcons.FaRegMoneyBillAlt />
                </span>
              </label>
            </li>
            <li className="checkout__payment-item">
              <label className="payment__rb">
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
                <span className="icon">
                  <AiIcons.AiOutlineCreditCard />
                </span>
              </label>
            </li>
          </ul>
        </div>
        <div className="checkout__footer">
          <ul className="checkout__footer-list">
            <li className="checkout__footer-item">
              <button
                className="checkout__btn checkout__btn-print"
                data-bs-dismiss="modal"
                onClick={() => checkoutOrder()}
              >
                Print
              </button>
            </li>
            <li className="checkout__footer-item">
              {/* <button
                className="checkout__btn checkout__btn-close"
                onClick={() => {
                  sendData(true);
                  cancelOrder();
                }}
              >
                Cancel
              </button> */}
              <button
                type="button"
                className="checkout__btn checkout__btn-close"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
