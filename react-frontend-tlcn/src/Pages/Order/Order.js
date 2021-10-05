import React from 'react'
import './Order.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function Order() {
    const { id } = useParams();
    const [selectedCate, setCate] = useState("COFFEE")
    const [billOrder, setBillOrder] = useState([])
    const onAdd = (data) => {
        const exist = billOrder.find(x => x.drink_id === data.drink_id);
        if (exist) {
            setBillOrder(billOrder.map(x => x.drink_id === data.drink_id ? { ...exist, qty: exist.qty + 1 } : x))
        } else {
            setBillOrder([...billOrder, { ...data, qty: 1 }])
        }
    }
    const TotalPrice = billOrder.reduce((a, c) => a + c.drink_price * c.qty, 0)
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'
     }

    const datas = [
        {
            "drink_id": 1,
            "drink_category": "COFFEE",
            "drink_name": "Black Coffee",
            "drink_price": 39000
        },
        {
            "drink_id": 2,
            "drink_category": "TEA",
            "drink_name": "Milk Coffee",
            "drink_price": 35000
        },
        {
            "drink_id": 3,
            "drink_category": "COOKIES",
            "drink_name": "Brown Coffee",
            "drink_price": 35000
        }
    ]

    return (
        <>
            <div className="order">
                <h1>Order - Number {id}</h1>
                <div className="order__table-height">
                    <table className="order__table">
                        <thead className="order__head">
                            <tr className="order__header">
                                <th>Id</th>
                                <th>Menu Id</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Note</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody className="order__body">
                            {billOrder.map((item, index) => (
                                <tr className="order__row">
                                    <td>{index + 1}</td>
                                    <td>{item.drink_id}</td>
                                    <td>{item.drink_name}</td>
                                    <td>{item.qty}</td>
                                    <td>{currencyFormat(item.drink_price)}</td>
                                    <td></td>
                                    <td>
                                        {currencyFormat(item.drink_price * item.qty)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="order__totalprice">
                    <div className="order__summary">
                        {currencyFormat(TotalPrice)}
                    </div>
                </div>
                <div className="category__container">
                    <h2>Category</h2>
                    <div className="order__menu">
                        <div className="category__title">
                            <ul className="category__list">
                                {datas.map(data => (
                                    <li
                                        className="category__item"
                                        onClick={() => setCate(data.drink_category)}
                                    >
                                        {data.drink_category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="category__name">
                            <ul className="category__name-list">
                                {datas.map((data) =>
                                    data.drink_category == selectedCate &&
                                    <li className="category__name-item"
                                        onClick={() => onAdd(data)}
                                    >
                                        {data.drink_name}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order
