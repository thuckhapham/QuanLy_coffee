import React from 'react'
import './Discount.css'

function Discount() {
    return (
        <>
            <div className="discount">
                <h2>Discount</h2>
                <ul className="discount__voucher-list">
                    <li className="discount__voucher-item">
                        25%
                    </li>
                    <li className="discount__voucher-item" onClick={() => console.log("50%")}>
                        50%
                    </li>
                    <li className="discount__voucher-item">
                        100%
                    </li>
                </ul>
                <div className="discount__footer">
                    <button className="discount__close" onClick={() => console.log("clicked")}>
                        Apply
                    </button>
                </div>
            </div>
        </>
    )
}

export default Discount
