import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import "./CheckOut.css";
import html2canvas from "html2canvas";
function CheckOut(props) {
  const details = props.orderdetail;
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  const [typePayment, setTypePayment] = useState("cash");
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
    convertToImage();
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
          tableStatus: "WAIT",
        },
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then(() => {
        axios({
          method: "put",
          url: "http://localhost:5000/api/table/insertOrder/" + res.data.table,
          data: {
            orderId: props.orderid,
          },
          headers: {
            Authorization: `bearer ${tokenBearer}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            let putcheckin = localStorage.getItem("checkin");
            console.log(putcheckin);
            putcheckin = JSON.parse(putcheckin);
            if (putcheckin !== null) {
              if (typePayment === "cash")
                putcheckin.cash = putcheckin.cash + parseInt(props.numberPrice);
              else
                putcheckin.online =
                  putcheckin.online + parseInt(props.numberPrice);
              putcheckin.countOrder++;
              localStorage.setItem("checkin", JSON.stringify(putcheckin));
            }
            navigate("/home");
          })
          .catch((e) => console.log(e));
      });
    });
  }
  // Checkout
  function convertToImage() {
    html2canvas(document.getElementById("export")).then(function (canvas) {
      saveAs(
        canvas.toDataURL(),
        "Bill_" + props.table + "_" + props.orderid + ".png"
      );
    });
  }

  useEffect(() => {
    if (localStorage.getItem("checkin") == null)
      alert("Cảnh báo: Bạn đang thực hiện Order mà chưa Checkin");
  }, []);

  function saveAs(uri, filename) {
    var link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  return (
    <>
      <div className="checkout">
        <div id="export">
          <div className="checkout__title">
            <h3>Bàn {props.table}</h3>
            <h6>#{props.orderid}</h6>
          </div>
          <div className="checkout__detail">
            <div className="checkout__table-content">
              <table className="checkout__table">
                <thead className="checkout__head">
                  <tr className="checkout__header">
                    <th style={{ width: 50 }}>Id</th>
                    <th>Name</th>
                    <th style={{ width: 50 }}>SL</th>
                    <th style={{ width: 150 }}>Price</th>
                  </tr>
                </thead>
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
          <div className="checkout__checkout">
            Check out: {props.totalprice}
          </div>
          <div className="checkout__payment">
            <ul className="checkout__payment-list">
              <li className="checkout__payment-item">
                <label className="payment__rb">
                  <input
                    type="radio"
                    name="radio"
                    onChange={(e) => setTypePayment("cash")}
                    defaultChecked
                  />
                  <span className="checkmark"></span>
                  <span className="icon">
                    <FaIcons.FaRegMoneyBillAlt />
                  </span>
                </label>
              </li>
              <li className="checkout__payment-item">
                <label className="payment__rb">
                  <input
                    type="radio"
                    name="radio"
                    onChange={(e) => setTypePayment("online")}
                  />
                  <span className="checkmark"></span>
                  <span className="icon">
                    <AiIcons.AiOutlineCreditCard />
                  </span>
                </label>
              </li>
            </ul>
          </div>
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
