import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import './DeleteMember.css'
import * as AiIcons from 'react-icons/ai'
function DeleteMember(props) {
    const [checkError, setError] = useState("")
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    //Xóa member
    const navigate = useNavigate();
    function deleteMember() {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/users/${props.editedCustomer._id}/disnable`,
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then(() => {
            // if (localStorage.getItem("tokenBearer")) {
            //     localStorage.removeItem('tokenBearer');
            //     sendData(true)
            //     navigate('/')
            // }
            props.setRequestData(new Date());
            sendData(true)
        }).catch(function (error) {
            if (error.response) {
                setError("Error")
            }
        })
    }
    return (
        <>
            <div className="deletemember">
                {checkError === "Error" ?
                    <>
                        <div className="error__content">
                            <h2 className="error__content--warn">
                                WARNING
                                <AiIcons.AiFillWarning className="deletemember__content deletemember__content-icon" />
                            </h2>
                            You don't have the authority!
                        </div>
                        <div className="error__footer">
                            <button className="error__btn error__btn-cancel"
                                onClick={() => setError("")}
                            >
                                Close
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <div className="deletemember__content">
                            <h2 className="deletemember__content--warn">
                                WARNING
                                <AiIcons.AiFillWarning className="deletemember__content deletemember__content-icon" />
                            </h2>

                            Do you really want to disable {props.editedCustomer.userName}?
                        </div>
                        <div className="deletemember__footer">
                            <button className="deletemember__btn deletemember__btn-confirm" onClick={() => {
                                deleteMember()
                            }}>
                                Confirm
                            </button>
                            <button className="deletemember__btn deletemember__btn-cancel" onClick={() => sendData(true)}>
                                Cancel
                            </button>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default DeleteMember
