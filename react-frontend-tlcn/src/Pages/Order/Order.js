import React from "react";
import "./Order.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import Discount from "../../Components/Modal/Order/Discount/Discount";
import CheckOut from "../../Components/Modal/Order/CheckOut/CheckOut";
import Member from "../../Components/Modal/Order/Member/Member";

function Order() {
  const { id } = useParams();
  const [selectedCate, setCate] = useState("COFFEE");

  const [billOrder, setBillOrder] = useState([]);

  //Set Modal Active
  const [viewModal, setViewModal] = useState(true);
  const [selectedButt, setButt] = useState("");
  const callbackModal = (modalState) => {
    setViewModal(modalState);
  };
  //Voucher
  const [priceVoucher, setVoucher] = useState(null);
  const [activeVoucher, setActive] = useState(false);
  //Lọc dữ liệu Category trùng
  const duplicateCheck = [];
  //Thêm Nước
  const onAdd = (data) => {
    const exist = billOrder.find((x) => x.drink_id === data.drink_id);
    if (exist) {
      setBillOrder(
        billOrder.map((x) =>
          x.drink_id === data.drink_id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setBillOrder([...billOrder, { ...data, qty: 1 }]);
    }
  };
  //Xóa bớt nước
  const onRemove = (data) => {
    const exist = billOrder.find((x) => x.drink_id === data.drink_id);
    if (exist.qty === 1) {
      setBillOrder(billOrder.filter((x) => x.drink_id !== data.drink_id));
    } else {
      setBillOrder(
        billOrder.map((x) =>
          x.drink_id === data.drink_id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  //Tính tổng tiền
  let TotalPrice = billOrder.reduce((a, c) => a + c.price * c.quantity, 0);
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
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }

  // Lấy dữ liệu nước
  const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products` + "?page=" + 1 + "&pagesize=" + 10)
      .then((response) => {
        setList(response.data.products)
        retrieveOrder(id)
      })
  }, [])
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  // Thêm nước
  function addingDrink(selectedId) {
    axios({
      method: 'post',
      url: `http://localhost:5000/api/order/${id}/addProduct`,
      data: {
        productId: selectedId,
        quantity: 1
      },
      headers: {
        'Authorization': `bearer ${tokenBearer}`,
        'Content-Type': 'application/json'
      },
    }).then(() => {
      retrieveOrder(id)
    })
  }
  // Lấy danh sách nước đang order 
  function retrieveOrder(id) {
    axios({
      method: 'get',
      url: `http://localhost:5000/api/order/${id}`,
      headers: {
        'Authorization': `bearer ${tokenBearer}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setBillOrder(response.data.orderItem)
    })
  }
  // Checkout
  function checkoutOrder(id) {
    axios({
      method: 'get',
      url: `http://localhost:5000/api/order/${id}/checkout`,
      headers: {
        'Authorization': `bearer ${tokenBearer}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setBillOrder(response.data.orderItem)
    })
  }
  const datas = [
    {
      drink_id: "COFFEE01",
      drink_category: "COFFEE",
      drink_name: "Black Coffee",
      drink_price: 39000,
    },
    {
      drink_id: "TEA01",
      drink_category: "TEA",
      drink_name: "Milk Coffee",
      drink_price: 35000,
    },
    {
      drink_id: "COOKIES02",
      drink_category: "COOKIES",
      drink_name: "Brown Coffee",
      drink_price: 35000,
    },
    {
      drink_id: "FRUIT01",
      drink_category: "FRUIT",
      drink_name: "Peach Tea",
      drink_price: 55000,
    },
    {
      drink_id: "FRUIT02",
      drink_category: "FRUIT",
      drink_name: "Oolong Tea",
      drink_price: 55000,
    },
    {
      drink_id: "FRUIT03",
      drink_category: "FRUIT",
      drink_name: "Macchiato Tea",
      drink_price: 55000,
    },
  ];

  return (
    <>
      <div className="order">
        <h1>Order - Number {id}</h1>
        <table className="order__table">
          <thead className="order__head">
            <tr className="order__header">
              <th>Id</th>
              {/* <th>Menu Id</th> */}
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              {/* <th>Note</th> */}
              <th>Total</th>
            </tr>
          </thead>
        </table>
        <div className="order__table-height">
          <table className="order__table">
            <tbody className="order__body">
              {billOrder.map((item, index) => (
                <tr className="order__row">
                  <td>{index + 1}</td>
                  {/* <td>{item._id}</td> */}
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="order__increase"
                      onClick={() => {
                        addingDrink(item.ProductID)
                      }}
                    >
                      +
                    </button>
                    {item.quantity}
                    <button
                      className="order__decrease"
                    // onClick={() => onRemove(item)}
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
          <div className="category__heading">Category</div>
          <div className="category__header">{selectedCate}</div>
          <div className="category__footer">
            <div className="order__menu">
              <div className="category__title">
                <ul className="category__list">
                  {viewList
                    .map((data, index) => {
                      if (duplicateCheck.includes(data.category))
                        return null;
                      duplicateCheck.push(data.category);
                      return (
                        <li
                          className="category__item"
                          onClick={() => {
                            setCate(data.category);
                          }}
                        >
                          {data.category}
                        </li>
                      );
                    })
                    .filter((e) => e)}
                </ul>
              </div>
              <div className="category__name">
                <ul className="category__name-list">
                  {viewList.map(
                    (data) =>
                      data.category === selectedCate && (
                        <li
                          className="category__name-item"
                          onClick={() => {
                            // setId(data._id)
                            addingDrink(data._id)
                            retrieveOrder(id)
                          }}
                        >
                          {data.name}
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>
            <div className="category__button">
              <ul>
                <li
                  className="category__button-member"
                  onClick={() => {
                    setViewModal(!viewModal);
                    setButt("member");
                  }}
                >
                  Member
                </li>
                <li
                  className="category__button-discount"
                  onClick={() => {
                    setViewModal(!viewModal);
                    setButt("discount");
                  }}
                >
                  Discount
                </li>
                <li
                  className="category__button-check"
                  onClick={() => {
                    setViewModal(!viewModal);
                    setButt("checkout");
                  }}
                >
                  Check out
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Layout */}
      <div className={viewModal ? "modal--unactive" : "modal"}>
        <div className="modal__overlay"></div>
        <div className="modal__body">
          <div style={{ display: "flex", "justify-content": "flex-end" }}>
            <button
              className="modal__btn-close"
              onClick={() => setViewModal(!viewModal)}
            >
              X
            </button>
          </div>
          {selectedButt === "discount" ? (
            <Discount
              ModalState={callbackModal}
              VoucherState={setVoucher}
              active={activeVoucher}
              clickActive={setActive}
            />
          ) : selectedButt === "checkout" ? (
            <CheckOut
              orderdetail={billOrder}
              orderid={id}
              totalprice={currencyFormat(TotalPrice)}
              discountprice={currencyFormat(DiscountPrice)}
              ModalState={callbackModal}
            />
          ) : (
            <Member
              ModalState={callbackModal}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
