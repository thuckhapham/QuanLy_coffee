import React, { useState } from 'react'
import './DeleteDrink.css'
import * as AiIcons from 'react-icons/ai'

function DeleteDrink(props) {
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
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    return (
        <>
            <div className="deletedrink">
                <div className="deletedrink__content">
                    <h2 className="deletedrink__content--warn">
                        WARNING
                        <AiIcons.AiFillWarning className="deletedrink__content deletedrink__content-icon" />
                    </h2>
                    Do you really want to delete this drink?
                </div>
                <div className="deletedrink__footer">
                    <button className="deletedrink__btn deletedrink__btn-confirm" onClick={() => sendData(true)}>
                        Confirm
                    </button>
                    <button className="deletedrink__btn deletedrink__btn-cancel" onClick={() => sendData(true)}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteDrink
