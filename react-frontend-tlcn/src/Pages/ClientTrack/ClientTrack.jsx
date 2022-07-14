import React, { useEffect, useState } from "react";
import "./ClientTrack.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
let count = 0;

function ClientTrack(props) {
  const [requestData, setRequestData] = useState(0);
  const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    console.log("UPDATE!");
    axios
      .get(`http://localhost:5000/api/table?page=1&pagesize=100`)
      .then((response) => {
        console.log(response.data);
        setList(response.data.tables);
      });
    axios
      .get(`http://localhost:5000/api/products?page=1&pagesize=100`)
      .then((response) => {
        setProduct(
          response.data.products.sort(function (a, b) {
            return a.category.localeCompare(b.category);
          })
        );
      });
  }, [requestData]);

  useEffect(() => {
    // 10s Call API để update 1 lần
    let a = setInterval(() => {
      // count = count + 1;
      // if (count === 5) {
      setRequestData((res) => res + 1);
      // count = 0;
      // }
    }, 5000);
    return () => clearInterval(a);
  }, []);

  // Order
  const navigate = useNavigate();
  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }
  return (
    <div className="client-track">
      <div className="row p-0 m-0 ">
        <h1 className="text-center">Xin quý khách theo dõi bàn của mình!</h1>
        <div></div>
        <div className="col-12">
          <ul className="w-100 fs-3">
            {/* <div className="col-4 d-inline-block">
              <span className="dot-big table-available d-inline-block"></span>{" "}
              Chưa có Order
            </div> */}
            <div className="col-6 d-inline-block">
              <span className="dot-big table-used d-inline-block table-clientcomplete"></span>
              Đến nhận nước!
            </div>
            <div className="col-6 d-inline-block">
              <span className="dot-big table-broken d-inline-block"></span>
              Đang pha chế
            </div>
          </ul>
          <div className="row text-center">
            {viewList.map((data, i) => {
              return (
                data.status !== "INIT" && (
                  <div className="col-6 col-sm-3 col-lg-2 col-xl-1 d-flex justify-content-center">
                    <button
                      className={
                        "homepage__order-link d-block m-1 " +
                        (data.status === "WAIT"
                          ? "table-broken table-not-clientcomplete"
                          : "table-clientcomplete  ")
                      }
                      // onClick={() => orderTable(data.tablePoin)}
                    >
                      {data.tablePoin}
                    </button>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <hr />
      <div className="row m-0 text-center">
        <h1 className="m-0">Menu</h1>
        {product.map(
          (e, i) =>
            (i === 0 || e.category !== product[i - 1].category) && (
              <div className="col-12 col-sm-6 p-3">
                <h5 className="m-0">{e.category}</h5>
                <table className="drinktable__table">
                  <thead className="drinktable__head">
                    <tr className="drinktable__header">
                      <th className="col-4">Name</th>
                      <th className="col-sm-3 col-2">Price</th>
                    </tr>
                  </thead>
                  <tbody className="drinktable__body">
                    {product.map(
                      (data) =>
                        data.category == e.category && (
                          <tr
                            className={
                              "drinktable__row " +
                              (data.available ? "" : " lineThrough text-muted")
                            }
                          >
                            <td>{data.name}</td>
                            <td>{currencyFormat(data.price)}</td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default ClientTrack;
