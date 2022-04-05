import axios from "axios";
import { useEffect, useState } from "react";

const Report = () => {
  const tokenBearer = localStorage.getItem("tokenBearer");

  const [order, setOrder] = useState({});
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/report/order`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <h1> REPORT</h1>
      Tổng số order: {order.number}
    </div>
  );
};

export default Report;
