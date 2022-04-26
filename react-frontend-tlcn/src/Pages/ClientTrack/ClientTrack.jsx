import React, { useEffect, useState } from "react";
import "./ClientTrack.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let count = 0;
function ClientTrack(props) {
  const [requestData, setRequestData] = useState(0);
  const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/table?page=1&pagesize=100`)
      .then((response) => {
        console.log(response.data);
        setList(response.data.tables);
      });
  }, [requestData]);

  useEffect(() => {
    // 10s Call API để update 1 lần
    let a = setInterval(() => {
      count = count + 1;
      if (count === 5) {
        setRequestData((res) => res + 1);
        count = 0;
      }
    }, 1000);
    return () => clearInterval(a);
  }, []);

  // Order
  const navigate = useNavigate();

  return (
    <>
      <div className="row p-0 m-0">
        <h1 className="text-center">Xin quý khách theo dõi bàn của mình!</h1>
        <h6 className="text-center"></h6>
        <div className="col-12">
          <ul className="w-100 fs-3">
            {/* <div className="col-4 d-inline-block">
              <span className="dot-big table-available d-inline-block"></span>{" "}
              Chưa có Order
            </div> */}
            <div className="col-6 d-inline-block">
              <span className="dot-big table-used d-inline-block table-clientcomplete"></span>
              Đến quầy nhận nước!
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
                  <div className="col-6 col-sm-3 col-lg-2 col-xl-1">
                    <button
                      className={
                        "homepage__order-link d-block " +
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
    </>
  );
}

export default ClientTrack;
