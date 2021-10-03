import React from 'react'
import './Order.css'
import { useParams } from 'react-router-dom'

function Order() {
    const { id } = useParams()
    return (
        <>
            <div className="order">
                <h1>Order</h1>
                <h2>{ id }</h2>
            </div>
        </>
    )
}

export default Order
