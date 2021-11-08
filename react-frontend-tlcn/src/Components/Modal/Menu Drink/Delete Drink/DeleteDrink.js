import React from 'react'
import './DeleteDrink.css'
import * as AiIcons from 'react-icons/ai'

function DeleteDrink(props) {
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
