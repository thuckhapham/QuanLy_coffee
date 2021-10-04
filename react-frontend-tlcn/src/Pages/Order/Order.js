import React from 'react'
import './Order.css'
import { useParams } from 'react-router-dom'

function Order() {
    const { id } = useParams();
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
            "drink_name": "Milk Coffee",
            "drink_price": 35000
        }
    ]
    
    return (
        <>
            <div className="order">
                <h1>Order - Number {id}</h1>
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
                        <tr className="order__row">
                            <td>1 </td>
                            <td>KH12</td>
                            <td>Milk Coffee</td>
                            <td>1</td>
                            <td>39000</td>
                            <td></td>
                            <td>39000</td>
                        </tr>
                        <tr className="order__row">
                            <td>2 </td>
                            <td>KH13</td>
                            <td>Black Coffee</td>
                            <td>1</td>
                            <td>39000</td>
                            <td></td>
                            <td>39000</td>
                        </tr>
                    </tbody>
                </table>
                <div className="category__container">
                    <h2>Category</h2>
                    <div className="order__menu">
                        <div className="category__title">
                            <ul className="category__list">
                                {/* <li className="category__item">
                                    TEA
                                </li>
                                <li className="category__item category__item--active">
                                    COFFEE
                                </li>
                                <li className="category__item">
                                    COOKIES
                                </li> */}
                                {datas.map(data => (
                                    <li className="category__item">{data.drink_category}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="category__name">
                            <ul className="category__name-list">
                                {/* <li className="category__name-item">
                                    Black Coffee
                                </li>
                                <li className="category__name-item">
                                    Milk Coffee
                                </li> */}
                                {datas.map(data => (
                                    <li className="category__name-item">{data.drink_name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order
