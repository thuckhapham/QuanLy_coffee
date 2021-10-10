import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import "./CheckOut.css";

function CheckOut(props) {
    const details = props.orderdetail;
    //Đóng Modal
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    // Quy tiền
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
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
                                        <td>{detail.drink_name}</td>
                                        <td>{detail.qty}</td>
                                        <td>{currencyFormat(detail.drink_price)}</td>
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
                                <input type="radio" name="radio" checked="checked" />
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
                            <button className="checkout__btn checkout__btn-print">
                                Print
                            </button>
                        </li>
                        <li className="checkout__footer-item">
                            <button className="checkout__btn checkout__btn-close"
                                onClick={() => sendData(true)}
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
