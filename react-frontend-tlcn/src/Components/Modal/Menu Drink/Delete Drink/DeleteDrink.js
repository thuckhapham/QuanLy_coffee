import React from 'react'
import './DeleteDrink.css'
import * as AiIcons from 'react-icons/ai'
import axios from 'axios'

function DeleteDrink(props) {
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Thêm nước
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3ZTM3MTY1NzdhZmFmZjIxYTg2N2EiLCJ1c2VyTmFtZSI6ImFkbWluIiwicm9sZSI6Ik1BTkFHRVIiLCJpYXQiOjE2MzcwMzA3MDZ9.n7xU9TnyRp4vWxX5QmmAxD_GMTWf7YBVojLONdMAYYs";
    function deletingDrink(selectedId) {
        axios({
            method: 'delete',
            url: 'http://localhost:5000/api/products/' + selectedId,
            headers: {
                'Authorization': `bearer ${token}`,
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
