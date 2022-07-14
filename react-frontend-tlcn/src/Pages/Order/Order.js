import React from "react";
import "./Order.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Discount from "../../Components/Modal/Order/Discount/Discount";
import CheckOut from "../../Components/Modal/Order/CheckOut/CheckOut";
import Member from "../../Components/Modal/Order/Member/Member";
import Header2 from "../../Components/Header2/Header";
import Footer from "../../Components/Footer/Footer";
function Order() {
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  
  const { id } = useParams();
  const [selectedCate, setCate] = useState("COFFEE");

  const [billOrder, setBillOrder] = useState({ orderItem: [] });

  //Set Modal Active
  const [viewModal, setViewModal] = useState(true);
  const [selectedButt, setButt] = useState("");
  const callbackModal = (modalState) => {
    setViewModal(modalState);
  };
  // Lấy dữ liệu nước
  const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?page=1&pagesize=100`)
      .then((response) => {
        console.log(response.data);
        setList(response.data.products);
      });
    retrieveOrder(id);
  }, []);
  //Voucher
  const [priceVoucher, setVoucher] = useState(null);
  const [activeVoucher, setActive] = useState(false);
  //Lọc dữ liệu Category trùng
  const duplicateCheck = [];
  //Tính tổng tiền
  let TotalPrice = billOrder.orderItem.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );
  let DiscountPrice = 0;
  //Nếu có voucher giảm thì trừ tiền
  {
    if (priceVoucher) {
      DiscountPrice = (TotalPrice * priceVoucher) / 100;
      TotalPrice = TotalPrice - DiscountPrice;
    }
  }
  //Quy đổi số về tiền việt
  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  // Thêm nước
  function addingDrink(selectedId) {
    axios({
      method: "post",
      url: `http://localhost:5000/api/order/${id}/addProduct`,
      data: {
        productId: selectedId,
        quantity: 1,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then(() => {
      retrieveOrder(id);
    });
  }
  // Trừ nước
  function minusDrink(selectedId) {
    axios({
      method: "post",
      url: `http://localhost:5000/api/order/${id}/addProduct`,
      data: {
        productId: selectedId,
        quantity: -1,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then(() => {
      retrieveOrder(id);
    });
  }
  // Lấy danh sách nước đang order
  function retrieveOrder(id) {
    axios({
      method: "get",
      url: `http://localhost:5000/api/order/${id}`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response.data.orderItem);
      setBillOrder(response.data);
    });
  }
  // Checkout
  // function checkoutOrder(id) {
  //   axios({
  //     method: 'get',
  //     url: `http://localhost:5000/api/order/${id}/checkout`,
  //     headers: {
  //       'Authorization': `bearer ${tokenBearer}`,
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((response) => {
  //     setBillOrder(response.data.orderItem)
  //   })
  // }

  const navigate = useNavigate();

  function cancelOrder() {
    axios({
      method: "delete",
      url: `http://localhost:5000/api/order/${id}`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/home");
    });
  }

  return (
    <>
      <Header2 />
      <div className="container p-3">
        <h1 className="text-center">Table {billOrder.table}</h1>
        <div className="order">
          <div className="order__table-height text-center">
            <table className="order__table">
              <thead className="order__head">
                <tr className="order__header">
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="order__body">
                {billOrder.orderItem.map((item, index) => (
                  <tr className="order__row">
                    <td>{item.name}</td>
                    <td className="text-center">
                      <button
                        className="order__increase"
                        onClick={() => {
                          addingDrink(item.ProductID);
                        }}
                      >
                        +
                      </button>
                      <div className="d-block d-md-inline-block ps-1 pe-1">
                        {" "}
                        {item.quantity}
                      </div>
                      <button
                        className="order__decrease"
                        onClick={() => minusDrink(item.ProductID)}
                      >
                        -
                      </button>
                    </td>
                    <td>{currencyFormat(item.price)}</td>
                    {/* <td></td> */}
                    <td>{currencyFormat(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="order__totalprice">
            <div className="order__summary">{currencyFormat(TotalPrice)}</div>
          </div>
          <div className="category__container">
            <div className="category__heading text-center">Category</div>
            <div className="w-100 text-center">
              {viewList
                .map((data, index) => {
                  if (duplicateCheck.includes(data.category)) return null;
                  duplicateCheck.push(data.category);
                  return (
                    <div
                      className={
                        "category__item d-inline-block " +
                        (selectedCate == data.category
                          ? " bg-primary text-light"
                          : "")
                      }
                      onClick={() => {
                        setCate(data.category);
                      }}
                    >
                      {data.category}
                    </div>
                  );
                })
                .filter((e) => e)}
            </div>
            <hr />
            <div className="row">
              <div className="col-12 col-md-8 mb-3 p-0">
                {viewList.map(
                  (data) =>
                    data.category === selectedCate && (
                      <div
                        className={
                          "category__name-item d-inline-block " +
                          (data.available ? "" : " lineThrough text-muted")
                        }
                        onClick={() => {
                          if (data.available) {
                            addingDrink(data._id);
                            retrieveOrder(id);
                          }
                        }}
                      >
                        {data.name}
                      </div>
                    )
                )}
                <hr className="d-block d-md-none" />
              </div>
              <div className="col-12 col-md-4 m-0 p-0">
                <div
                  className="category__button-member col-12 d-flex align-items-center"
                  onClick={() => {
                    cancelOrder();
                  }}
                >
                  Cancel
                </div>
                <div
                  className="category__button-check col-12 d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Check out
                </div>
              </div>
            </div>
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
                  Thanh Toán
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body text-center">
                <CheckOut
                  orderdetail={billOrder.orderItem}
                  orderid={id}
                  totalprice={currencyFormat(TotalPrice)}
                  numberPrice={TotalPrice}
                  discountprice={currencyFormat(DiscountPrice)}
                  ModalState={callbackModal}
                  table={billOrder.table}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
