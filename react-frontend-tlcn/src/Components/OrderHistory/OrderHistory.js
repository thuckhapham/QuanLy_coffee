import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./OrderHistory.css";

function OrderHistory() {
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  // Lấy dữ liệu order
  const [viewList, setList] = useState([{ phone: 0, name: "", total: 0 }]);
  const location = useLocation();
  //Quy đổi số về tiền việt
  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/order/?pagesize=100`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
        console.log(response.data)
      setList(response.data.orders.slice(-5).reverse());
    });
  }, [location]);
  return (
    <>
      <div className="history">
        <table className="history__table">
          <thead className="history__head">
            <tr className="history__header">
              <th>Order</th>
              <th>Order Id</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="history__body">
            {viewList.map((data, index) => (
              <tr className="history__row">
                <td>{index + 1} </td>
                <td>{data.table}</td>
                <td>{currencyFormat(data.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderHistory;
