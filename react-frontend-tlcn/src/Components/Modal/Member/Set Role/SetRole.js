import React from 'react'
import './SetRole.css'
import { useState } from 'react'
import axios from 'axios'
import Error from '../../../Error/Error'

function SetRole(props) {
    const [checkError, setError] = useState("")
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");

    const [selectedRole, setRole] = useState(props.editedCustomer.role)

    //Sửa Role
    function editRole() {
        axios({
            method: 'post',
            url: `http://localhost:5000/api/users/${props.editedCustomer._id}/role`,
            data: {
                role: selectedRole
            },
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then(() => {
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
            <div className="editcustomer__content">
                {checkError === "Error" ?
                    <>
                        <Error message="Please check the authority again!" setError={setError} />
                    </>
                    :
                    <>
                        <div className="editcustomer__content-header">
                            EDIT MEMBER's ROLE
                        </div>
                        <div className="editcustomer__content-list">
                            <div className="editcustomer__content-item">
                                <div className="editcustomer__lable">
                                    CURRENT ROLE:
                                </div>
                                <div className="viewcustomer__input">
                                    {props.editedCustomer.role}
                                </div>
                            </div>
                            <div className="newcustomer__content-item">
                                <div className="newcustomer__lable">
                                    NEW ROLE:
                                </div>
                                <div className="newcustomer__input">
                                    <select id="category" className="newdrink__select"
                                        onChange={(event) => setRole(event.target.value)}
                                    >
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="USER">USER</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="editcustomer__content-btn">
                            <button
                                className="editcustomer__btn editcustomer__btn--add"
                                onClick={() => {
                                    editRole()
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="editcustomer__btn editcustomer__btn--cancle"
                                onClick={() => {
                                    sendData(true)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default SetRole
