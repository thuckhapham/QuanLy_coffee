import React from 'react'
import './OrderHistory.css'

function OrderHistory() {
    return (
        <>
            <div className="history">
                <table className="history__table">
                    <thead className="history__head">
                        <tr className="history__header">
                            <th>Order</th>
                            <th>Order Id</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody className="history__body">
                        <tr className="history__row">
                            <td>1 </td>
                            <td>KH12</td>
                            <td>180000</td>
                        </tr>
                        <tr className="history__row">
                            <td>2 </td>
                            <td>KH12</td>
                            <td>920000</td>
                        </tr>
                        <tr className="history__row">
                            <td>3 </td>
                            <td>KH22</td>
                            <td>890000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrderHistory
