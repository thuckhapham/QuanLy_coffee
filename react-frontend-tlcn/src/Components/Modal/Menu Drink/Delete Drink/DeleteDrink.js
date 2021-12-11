import React from 'react'
import './DeleteDrink.css'
import * as AiIcons from 'react-icons/ai'
import axios from 'axios'

function DeleteDrink(props) {
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Thêm nước
    function deletingDrink(selectedId) {
        axios({
            method: 'delete',
            url: 'http://localhost:5000/api/products/' + selectedId,
            headers: {
                'Authorization': `bearer ${props.tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then(() => {
            props.setRequestData(new Date());
        })
    }
    return (
        <>
            <div className="deletedrink">
                <div className="deletedrink__content">
                    <h2 className="deletedrink__content--warn">
                        WARNING
                        <AiIcons.AiFillWarning className="deletedrink__content deletedrink__content-icon" />
                    </h2>
                    Do you really want to delete {props.editedDrink[0].name}?
                </div>
                <div className="deletedrink__footer">
                    <button className="deletedrink__btn deletedrink__btn-confirm" onClick={() => {
                        sendData(true)
                        deletingDrink(props.editedDrink[0]._id)
                    }}>
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
