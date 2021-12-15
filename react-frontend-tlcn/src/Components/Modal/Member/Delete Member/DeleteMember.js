import React from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import './DeleteMember.css'
import * as AiIcons from 'react-icons/ai'
function DeleteMember(props) {
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    //Xóa member
    const navigate = useNavigate();
    function deleteMember() {
        axios({
            method: 'delete',
            url: `http://localhost:5000/api/users/${props.editedCustomer._id}`,
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then(() => {
            if (localStorage.getItem("tokenBearer")) {
                localStorage.removeItem('tokenBearer');
                navigate('/')
            }
        })
    }
    return (
        <>
            <div className="deletemember">
                <div className="deletemember__content">
                    <h2 className="deletemember__content--warn">
                        WARNING
                        <AiIcons.AiFillWarning className="deletemember__content deletemember__content-icon" />
                    </h2>

                    Do you really want to delete {props.editedCustomer.userName}?
                </div>
                <div className="deletemember__footer">
                    <button className="deletemember__btn deletemember__btn-confirm" onClick={() => {
                        sendData(true)
                        deleteMember()
                    }}>
                        Confirm
                    </button>
                    <button className="deletemember__btn deletemember__btn-cancel" onClick={() => sendData(true)}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteMember
