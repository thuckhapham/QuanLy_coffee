import React, { useState, useEffect } from "react";
import "./Drink.css";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as GrIcons from "react-icons/gr";
import * as VscDebugRestart from "react-icons/vsc";
import NewDrink from "../../Components/Modal/Menu Drink/New Drink/NewDrink";
import DeleteDrink from "../../Components/Modal/Menu Drink/Delete Drink/DeleteDrink";
import EditDrink from "../../Components/Modal/Menu Drink/Edit Drink/EditDrink";
import Footer from "../../Components/Footer/Footer";
import Header2 from "../../Components/Header2/Header";
import { DebounceInput } from "react-debounce-input";

function Drink() {
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  const coffeeRole = localStorage.getItem("coffeeRole");
  //Save Drink Data to array
  const [editedDrink, setEditedDrink] = useState([
    { drink_id: 0, drink_name: "loading" },
  ]);
  //Lấy DatacoffeeRole
  const [requestData, setRequestData] = useState(new Date());
  const [searchWarn, setSearchWarn] = useState("");
  const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);
  const [originList, setOrigin] = useState([{ phone: 0, name: "", price: 0 }]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?page=1&pagesize=100`)
      .then((response) => {
        setList(response.data.products);
        setOrigin(response.data.products);
      });
  }, [requestData]);
  //Lấy Data theo Cate
  const [viewCategory, setCategory] = useState("ALL");
  //Lấy Data theo ID
  const [viewID, setID] = useState("");
  function searchID(id) {
    if (id === "") {
      setList(originList);
      setSearchWarn("");
    } else {
      let newlist = [];
      originList.map((e) => {
        if (e.name.toLowerCase().includes(id.toLowerCase())) {
          newlist.push(e);
        }
      });
      if (newlist.length === 0) setSearchWarn("Không tìm thấy");
      else {
        setList(newlist);
        setSearchWarn("");
      }
    }
  }
  //Set Modal Active
  const [viewModal, setViewModal] = useState(true);
  const [selectedButt, setButt] = useState("");
  //Nhận dữ liệu truyền từ Modal con
  const callbackModal = (modalState) => {
    setViewModal(modalState);
  };
  //Quy đổi số về tiền việt
  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ";
  }
  return (
    <>
      <Header2 />
      <div className="container p-3">
        <h1 className="text-center">Drink Control</h1>
        <div className="row p-2 m-0">
          <div className="col-12 col-md-4">
            <label>Drink name:</label>
            <DebounceInput
              type="text"
              className="drinksearch__form"
              placeholder="Cà phê"
              debounceTimeout={500}
              onChange={(e) => {
                searchID(e.target.value);
              }}
            />
          </div>
          <div className=" col-12 col-md-4">
            <div className="drinktable__header-item ">
              Drink's category:
              <br />
              <select
                id="category"
                className="drinksearch__form "
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="ALL">ALL</option>
                <option value="TEA">TEA</option>
                <option value="COFFEE">COFFEE</option>
                <option value="COOKIES">COOKIES</option>
                <option value="FRUIT">FRUIT</option>
              </select>
            </div>
          </div>
          {coffeeRole === "ADMIN" && (
            <div className="text-center text-md-end my-auto col-12 pt-3 col-md-4">
              <button
                className="drinktable__btn-add "
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                  setViewModal(!viewModal);
                  setButt("newdrink");
                }}
              >
                + DRINK
              </button>
            </div>
          )}
        </div>

        <div className="drinktable__detail">
          <div className="drinktable__table-content">
            <table className="drinktable__table  text-center">
              <thead className="drinktable__head">
                <tr className="drinktable__header">
                  {/* <th>Drink Id</th> */}
                  <th className="col-2  d-none d-md-table-cell">Category</th>
                  <th className="col-4">Name</th>
                  <th className="col-sm-3 col-2">Price</th>
                  {coffeeRole === "ADMIN" && (
                    <th className="col-sm-2 col-3">Action</th>
                  )}
                </tr>
              </thead>
              {searchWarn === "" ? (
                <tbody className="drinktable__body">
                  {viewCategory == "ALL"
                    ? viewList.map((data, index) => (
                        <tr
                          className={
                            "drinktable__row " +
                            (data.available == false
                              ? "bg-faded text-muted"
                              : "")
                          }
                        >
                          <td className="d-none d-md-table-cell">
                            {data.category}
                          </td>
                          <td>{data.name}</td>
                          <td>{currencyFormat(data.price)}</td>
                          {coffeeRole === "ADMIN" && (
                            <td>
                              <button
                                className="bg-success text-light text-center p-1 me-1"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  setButt("editdrink");
                                  setViewModal(!viewModal);
                                  setEditedDrink([data]);
                                }}
                              >
                                <AiIcons.AiFillEdit className="d-flex align-content-center flex-wrap" />
                              </button>
                              <button
                                className="bg-danger text-light text-center p-1"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                  setViewModal(!viewModal);
                                  setButt("canceldrink");
                                  setEditedDrink([data]);
                                }}
                              >
                                {data.available == false ? (
                                  <VscDebugRestart.VscDebugRestart className="d-flex align-content-center flex-wrap" />
                                ) : (
                                  <GiIcons.GiCancel className="d-flex align-content-center flex-wrap" />
                                )}
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    : viewList.map(
                        (data, index) =>
                          data.category == viewCategory && (
                            <tr className={"drinktable__row "}>
                              <td className="d-none d-md-table-cell">
                                {data.category}
                              </td>
                              <td>{data.name}</td>
                              <td>{currencyFormat(data.price)}</td>
                              {coffeeRole === "ADMIN" && (
                                <td>
                                  <button
                                    className="drinktable__btn-edit"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => {
                                      setButt("editdrink");
                                      setViewModal(!viewModal);
                                      setEditedDrink([data]);
                                    }}
                                  >
                                    <AiIcons.AiFillEdit className="drinktable__btn-editicon" />
                                  </button>
                                  <button
                                    className="drinktable__btn-cancel"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => {
                                      setViewModal(!viewModal);
                                      setButt("canceldrink");
                                      setEditedDrink([data]);
                                    }}
                                  >
                                    <GiIcons.GiCancel className="drinktable__btn-cancelicon" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          )
                      )}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colspan="5" className="text-danger">
                      {searchWarn}
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
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
                  Drink Modal
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-center">
                {selectedButt === "newdrink" ? (
                  <NewDrink
                    tokenBearer={tokenBearer}
                    ModalState={callbackModal}
                    datas={viewList}
                    setRequestData={setRequestData}
                  />
                ) : selectedButt === "canceldrink" ? (
                  <DeleteDrink
                    tokenBearer={tokenBearer}
                    ModalState={callbackModal}
                    editedDrink={editedDrink}
                    setRequestData={setRequestData}
                  />
                ) : (
                  <EditDrink
                    tokenBearer={tokenBearer}
                    ModalState={callbackModal}
                    editedDrink={editedDrink}
                    setRequestData={setRequestData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Drink;
