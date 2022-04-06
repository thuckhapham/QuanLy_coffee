import React, { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Homepage(props) {
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  //Lấy Data
  const [requestData, setRequestData] = useState(new Date());
  const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);

  //new eidt
  const [selectedTable, setSelectedTable] = useState(undefined);
  const [activeTable, setActiveTable] = useState(0);

  useEffect(() => {
    if (selectedTable !== undefined && selectedTable.status === "USED")
      axios({
        method: "get",
        url: "http://localhost:5000/api/order/624c3616de5ecaf61ce75584",
        headers: {
          Authorization: `bearer ${tokenBearer}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        // alert(JSON.stringify(res.data));
      });
  }, [selectedTable]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/table?page=1&pagesize=100`)
      .then((response) => {
        console.log(response.data);
        setList(response.data.tables);
      });
  }, [requestData]);
  //Set Modal Active
  const [viewModal, setViewModal] = useState(true);
  //Default new table
  const [selectedName, setName] = useState("");
  // Thêm bàn mới
  function addingTable(selectedName) {
    axios({
      method: "post",
      url: "http://localhost:5000/api/table/",
      data: {
        tablePoin: selectedName,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        alert(JSON.stringify(res.data));
        setRequestData(new Date());
        setName("");
      })
      .catch((e) => {
        if (e.response.status) alert("Lỗi: Đã tồn tại bàn: " + selectedName);
      });
  }
  // Order
  const navigate = useNavigate();
  function orderTable(table) {
    axios({
      method: "post",
      url: "http://localhost:5000/api/order",
      data: {
        table: table,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      //   alert(JSON.stringify(response.data));
      if (response.data._id) {
        navigate("/order/" + response.data._id);
      } else {
        console.log("Error");
      }
    });
  }

  const UpdateStatus = (to) => {
    axios({
      method: "post",
      url:
        "http://localhost:5000/api/table/" +
        selectedTable.tablePoin +
        "/status",
      data: {
        tableStatus: to,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setRequestData(new Date());
    });
  };

  const removeTable = () => {
    axios({
      method: "delete",
      url: "http://localhost:5000/api/table/" + selectedTable.tablePoin,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setRequestData(new Date());
    });
  };

  return (
    <>
      <button
        type="button"
        className="homepage__btn-add mx-auto d-block"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        + CREATE TABLE
      </button>

      <div className="row">
        <div className="col-12 col-sm-8">
          <ul className="w-100">
            <li>
              <span className="dot table-available d-inline-block"></span>: Chưa
              có Order
            </li>
            <li>
              <span className="dot table-used d-inline-block"></span>: Chờ pha
              chế
            </li>
            <li>
              <span className="dot table-broken d-inline-block"></span>: Hoàn
              thành
            </li>
          </ul>
          <div className="row text-center">
            {viewList.map((data, i) => (
              <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                <button
                  className={
                    "homepage__order-link d-block " +
                    (i === activeTable && "table-active-border") +
                    " " +
                    (data.status === "AVAILABLE"
                      ? "table-available"
                      : data.status === "USED"
                      ? "table-used"
                      : "table-broken")
                  }
                  // onClick={() => orderTable(data.tablePoin)}
                  onClick={() => {
                    setSelectedTable(data);
                    setActiveTable(i);
                  }}
                >
                  {data.tablePoin}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-sm-4">
          {selectedTable === undefined ? (
            <p>Chọn một bàn để xem</p>
          ) : (
            <>
              <ul className="table-control text-center">
                <li className="">
                  <h3> Thông tin bàn: {selectedTable.tablePoin}</h3>
                  {/* ({selectedTable._id}) */}
                </li>
                <li>
                  Trạng thái:
                  <select
                    className="ms-1"
                    value={selectedTable.status}
                    onChange={(e) =>
                      setSelectedTable((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    disabled
                  >
                    <option value={"AVAILABLE"}>Chưa có Order</option>
                    <option value={"USED"}>Chờ pha chế</option>
                    <option value={"BROKEN"}>Đã hoàn thành</option>
                  </select>
                  {/* <div
                className="homepage__btn-add d-inline-block ms-1"
                onClick={() => UpdateStatus()}
              >
                Update Staus
              </div> */}
                </li>
                <li>______________________</li>
                <li>
                  {selectedTable.status === "AVAILABLE" ? (
                    <>
                      <div
                        className="homepage__btn-add d-inline-block ms-1"
                        onClick={() => orderTable(selectedTable.tablePoin)}
                      >
                        Go Order
                      </div>
                      <div
                        className="newtable__btn newtable__btn--cancle d-inline-block ms-1 "
                        onClick={() => removeTable()}
                      >
                        Xóa
                      </div>
                    </>
                  ) : selectedTable.status === "USED" ? (
                    <>
                      <div
                        className="homepage__btn-add d-inline-block ms-1"
                        onClick={() => UpdateStatus("BROKEN")}
                      >
                        Hoàn thành
                      </div>
                    </>
                  ) : (
                    <div
                      className="homepage__btn-add d-inline-block ms-1"
                      onClick={() => removeTable()}
                    >
                      Xóa bàn
                    </div>
                  )}
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
      {/* Modal Layout */}
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
              {" "}
              <div className="m-0">
                <div className="newtable__content-header m-0">
                  CREATING NEW TABLE
                </div>
                <div className="newtable__content-list">
                  <div className="newtable__content-item">
                    <div
                      className="btn btn-dark"
                      onClick={() => {
                        setName(Math.floor(Math.random() * 999 + 100));
                      }}
                    >
                      Ramdom Table
                    </div>
                    <div className="newtable__input mt-2">
                      <input
                        id="tablePoint"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        value={selectedName}
                        type="string"
                        className="newtable__form"
                        placeholder="TablePoint"
                      />
                    </div>
                  </div>
                  <div className="newtable__content-item mt-3">
                    <div className="newtable__input">
                      <input
                        type="text"
                        className="newtable__form"
                        placeholder="Source"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="newtable__btn newtable__btn--cancle"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-bs-dismiss="modal"
                className="newtable__btn newtable__btn--add"
                onClick={() => {
                  addingTable(selectedName);
                  setViewModal(!viewModal);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <div className="homepage">
    //     <div className="homepage__header-list">
    //       <div className="homepage__header-item homepage__header-btn">
    //         <button
    //           className="homepage__btn-add"
    //           onClick={() => setViewModal(!viewModal)}
    //         >
    //           + CREATE TABLE
    //         </button>
    //       </div>
    //     </div>
    //     <div className="homepage__contain">
    // <ul className="w-100">
    //   <li>
    //     <span className="dot table-available d-inline-block"></span>: Chưa
    //     có Order
    //   </li>
    //   <li>
    //     <span className="dot table-used d-inline-block"></span>: Chờ pha
    //     chế
    //   </li>
    //   <li>
    //     <span className="dot table-broken d-inline-block"></span>: Hoàn
    //     thành
    //   </li>
    // </ul>
    //     {viewList.map((data) => (
    //       <button
    //         className={
    //           "homepage__order-link " +
    //           (data.status === "AVAILABLE"
    //             ? "table-available"
    //             : data.status === "USED"
    //             ? "table-used"
    //             : "table-broken")
    //         }
    //         // onClick={() => orderTable(data.tablePoin)}
    //         onClick={() => setSelectedTable(data)}
    //       >
    //         {data.tablePoin}
    //       </button>
    //     ))}
    //   </div>
    // </div>
    // {selectedTable === undefined ? (
    //   <p>Chọn một bàn để xem</p>
    // ) : (
    //   <>
    //     {JSON.stringify(selectedTable)}
    //     <ul className="table-control text-center">
    //       <li className="">
    //         <strong> Table name: {selectedTable.tablePoin}</strong> (
    //         {selectedTable._id})
    //       </li>
    //       <li>
    //         <select
    //           className="ms-1"
    //           value={selectedTable.status}
    //           onChange={(e) =>
    //             setSelectedTable((prev) => ({
    //               ...prev,
    //               status: e.target.value,
    //             }))
    //           }
    //           disabled
    //         >
    //           <option value={"AVAILABLE"}>Chưa có Order</option>
    //           <option value={"USED"}>Chờ pha chế</option>
    //           <option value={"BROKEN"}>Hoàn thành</option>
    //         </select>
    //         {/* <div
    //           className="homepage__btn-add d-inline-block ms-1"
    //           onClick={() => UpdateStatus()}
    //         >
    //           Update Staus
    //         </div> */}
    //       </li>
    //       <li>______________________</li>
    //       <li>
    //         {selectedTable.status === "AVAILABLE" ? (
    //           <div
    //             className="homepage__btn-add d-inline-block ms-1"
    //             onClick={() => orderTable(selectedTable.tablePoin)}
    //           >
    //             Go Order
    //           </div>
    //         ) : selectedTable.status === "USED" ? (
    //           <>
    //             <div
    //               className="homepage__btn-add d-inline-block ms-1"
    //               onClick={() => UpdateStatus("BROKEN")}
    //             >
    //               Hoàn thành
    //             </div>
    //           </>
    //         ) : (
    //           <div
    //             className="homepage__btn-add d-inline-block ms-1"
    //             onClick={() => removeTable()}
    //           >
    //             Xóa bàn
    //           </div>
    //         )}
    //       </li>
    //     </ul>
    //   </>
    // )}
    // {/* Modal Layout */}
    // <div className={viewModal ? "modal--unactive" : "modal"}>
    //   <div className="modal__overlay"></div>
    //   <div className="modal__body">
    //     <div style={{ display: "flex", "justify-content": "flex-end" }}>
    //       <button
    //         className="modal__btn-close"
    //         onClick={() => setViewModal(!viewModal)}
    //       >
    //         X
    //       </button>
    //     </div>
    //     <div className="newtable__content">
    //       <div className="newtable__content-header">CREATING NEW TABLE</div>
    //       <div className="newtable__content-list">
    //         <div className="newtable__content-item">
    //           <div className="newtable__lable">TABLE ORDER:</div>
    //           <div className="newtable__input">
    //             .btn
    //             <input
    //               id="tablePoint"
    //               onChange={(e) => {
    //                 setName(e.target.value);
    //               }}
    //               type="string"
    //               className="newtable__form"
    //               placeholder="TablePoint"
    //             />
    //           </div>
    //         </div>
    //         <div className="newtable__content-item">
    //           <div className="newtable__lable">TABLE SOURCE:</div>
    //           <div className="newtable__input">
    //             <input
    //               type="text"
    //               className="newtable__form"
    //               placeholder="Source"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="newtable__content-btn">
    //         <button
    //           className="newtable__btn newtable__btn--add"
    //           onClick={() => {
    //             addingTable(selectedName);
    //             setViewModal(!viewModal);
    //           }}
    //         >
    //           Add
    //         </button>
    //         <button
    //           className="newtable__btn newtable__btn--cancle"
    //           onClick={() => setViewModal(!viewModal)}
    //         >
    //           Cancle
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </>
  );
}

export default Homepage;
