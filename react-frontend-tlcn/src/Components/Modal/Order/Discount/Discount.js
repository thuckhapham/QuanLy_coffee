import React, { useState } from 'react'
import './Discount.css'

function Discount(props) {

    const datas = [
        {
            discount_id: "d01",
            percentage: "35"
        },
        {
            discount_id: "d02",
            percentage: "50"
        },
        {
            discount_id: "d03",
            percentage: "100"
        },
        {
            discount_id: "d04",
            percentage: "0"
        },
    ]

    const [useVoucher, setVoucher] = useState()
    // const [activeVoucher, setActive] = useState(false)
    const sendData = (modalState, voucherState) => {
        props.ModalState(modalState)
        props.VoucherState(voucherState)
    }
    return (
        <>
            <div className="discount">
                <h2>Discount</h2>
                <ul className="discount__voucher-list">
                    {datas.map(data => (
                        <li className={data.discount_id === props.active ? "discount__voucher-item discount__voucher-item--active" : "discount__voucher-item"}
                            onClick={() => {
                                setVoucher(data.percentage);
                                props.clickActive(data.discount_id)
                            }}
                        >
                            {data.percentage}%
                        </li>
                    ))}
                </ul>
                <div className="discount__footer">
                    <button className="discount__close" onClick={() => sendData(true, useVoucher)}>
                        Apply
                    </button>
                </div>
            </div>
        </>
    )
}

export default Discount
