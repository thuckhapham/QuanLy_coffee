import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai'
import './NewCustomer.css'

function NewCustomer(props) {
    const [checkError, setError] = useState("")
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");

    const [selectedUsername, setUsername] = useState("")
    const [selectedPassword, setPassword] = useState("")
    const [selectedRole, setRole] = useState("")
    const [selectedEmail, setEmail] = useState("")
    const [selectedFirstName, setFirstName] = useState("")
    const [selectedLastName, setLastName] = useState("")
    const [selectedPhone, setPhone] = useState("")

    function addMember() {
        axios({
            method: 'post',
            url: `http://localhost:5000/api/users/`,
            data: {
                userName: selectedUsername,
                password: selectedPassword,
                role: "USER",
                email: selectedEmail,
                firstName: selectedFirstName,
                lastName: selectedLastName,
                phone: selectedPhone,
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
            <div className="newcustomer__content">
                {checkError === "Error" ?
                    <>
                        <div className="error__content">
                            <h2 className="error__content--warn">
                                WARNING
                                <AiIcons.AiFillWarning className="deletemember__content deletemember__content-icon" />
                            </h2>
                            Error!!!
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
                        <div className="newcustomer__content-header">
                            NEW MEMBER
                        </div>
                        <div className="newcustomer__content-list">
                            <div className="newcustomer__content-item">
                                <div className="newcustomer__lable">
                                    USERNAME:
                                </div>
                                <div className="newcustomer__input">
                                    <input type="text" className="newcustomer__form" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="newcustomer__content-item">
                                <div className="newcustomer__lable">
                                    PASSWORD:
                                </div>
                                <div className="newcustomer__input">
                                    <input type="password" className="newcustomer__form" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>
                            {/* <div className="newcustomer__content-item">
                                <div className="newcustomer__lable">
                                    ROLE:
                                </div>
                                <div className="newcustomer__input">
                                    <select id="category" className="newdrink__select"
                                        onChange={(event) => setRole(event.target.value)}
                                    >
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="USER">USER</option>
                                    </select>
                                </div>
                            </div> */}
                            <div className="newcustomer_idtent-item">
                                <div className="newcustomer__lable">
                                    EMAIL:
                                </div>
                                <div className="newcustomer__input">
                                    <input type="text" className="newcustomer__form" placeholder="Member's email" onChange={e => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="newcustomer__content-item">
                                <div className="newcustomer__lable">
                                    FIRST NAME:
                                </div>
                                <div className="newcustomer__input">
                                    <input type="text" className="newcustomer__form" placeholder="Member's first name" onChange={e => setFirstName(e.target.value)} />
                                </div>
                            </div>
                            <div className="newcustomer__content-item">
                                <div className="newcustomer__lable">
                                    LAST NAME:
                                </div>
                                <div className="newcustomer__input">
                                    <input type="text" className="newcustomer__form" placeholder="Member's last name" onChange={e => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="newcustomer_idtent-item">
                                <div className="newcustomer__lable">
                                    PHONE:
                                </div>
                                <div className="newcustomer__input">
                                    <input type="text" className="newcustomer__form" placeholder="Member's phone" onChange={e => setPhone(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="newcustomer__content-btn">
                            <button
                                className="newcustomer__btn newcustomer__btn--add"
                                onClick={() => {
                                    addMember()
                                }}
                            >
                                Add
                            </button>
                            <button
                                className="newcustomer__btn newcustomer__btn--cancle"
                                onClick={() => sendData(true)}
                            >
                                Cancel
                            </button>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default NewCustomer
