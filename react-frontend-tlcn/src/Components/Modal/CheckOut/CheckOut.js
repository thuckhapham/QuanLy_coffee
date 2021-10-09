import React from 'react'
import './CheckOut.css'

function CheckOut(props) {
    console.log(props.orderdetail)
    console.log(props.orderid)
    return (
        <>
            <div className="checkout">
                <h1>Order number {props.orderid}</h1>
                <h1>Hello</h1>
            </div>
        </>
    )
}

export default CheckOut
