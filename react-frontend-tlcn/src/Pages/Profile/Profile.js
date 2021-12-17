import React from 'react'
import { useState, useEffect } from 'react'
import EditMember from '../../Components/Modal/Member/Edit Member/EditMember'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai'
import './Profile.css'

function Profile(props) {
    const [requestData, setRequestData] = useState(new Date());
    //Set Modal Active
    const [viewModal, setViewModal] = useState(true);
    const [selectedButt, setButt] = useState("");
    console.log(selectedButt)
    const callbackModal = (modalState) => {
        setViewModal(modalState);
    };
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    const [checkError, setError] = useState("")

    //Data
    const [editedCustomer, setEditedCustomer] = useState([{ customer_id: 0, customer_name: "loading" }]);
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/users/info`,
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                setEditedCustomer(response.data)
            })
    }, [])

    const [selectedRole, setRole] = useState(editedCustomer.role)
    const [selectedFirstName, setFirstName] = useState(editedCustomer.firstName)
    const [selectedLastName, setLastName] = useState(editedCustomer.lastName)
    const [selectedEmail, setEmail] = useState(editedCustomer.email)
    const [selectedPhone, setPhone] = useState("")

    const [viewList, setList] = useState([{ phone: 0, name: "", email: "" }]);

    //Save Member Data to array
    // const [editedCustomer, setEditedCustomer] = useState([{ customer_id: 0, customer_name: "loading" }]);
    // function saveCustomer(cusId) {
    //     axios({
    //         method: 'get',
    //         url: `http://localhost:5000/api/users/${cusId}`,
    //         headers: {
    //             'Authorization': `bearer ${tokenBearer}`,
    //             'Content-Type': 'application/json'
    //         },
    //     }).then((response) => {
    //         setEditedCustomer(response.data)
    //     })
    // }

    return (
        <>
            <>
                <div className="editprofile__content-header">
                    MY PROFILE
                </div>
                <div className="editprofile__content-btn">
                    <button
                        className="editprofile__btn editprofile__btn--add"
                        onClick={() => {
                            setViewModal(!viewModal)
                            setButt("editmember")
                            // saveCustomer(data._id)
                        }}
                    >
                        Edit
                    </button>
                    {/* <button
                        className="editprofile__btn editprofile__btn--cancle"
                        onClick={() => {
                            sendData(true)
                        }}
                    >
                        Cancel
                    </button> */}
                </div>
                <div className="editprofile__content-list">
                    <div className="editprofile__content-item">
                        <div className="editprofile__lable">
                            MEMBER ID:
                        </div>
                        <div className="editprofile__input">
                            <input type="text" className="editprofile__form" placeholder="ID"
                                value={editedCustomer._id} readOnly />
                        </div>
                    </div>
                    <div className="newcustomer__content-item">
                        <div className="newcustomer__lable">
                            ROLE:
                        </div>
                        {/* <div className="newcustomer__input">
                            <select id="category" className="newdrink__select"
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div> */}
                        <div className="editprofile__input">
                            <input type="text" className="editprofile__form" placeholder="ID"
                                value={editedCustomer.role} readOnly />
                        </div>
                    </div>
                    <div className="editprofile__content-item">
                        <div className="editprofile__lable">
                            FIRST NAME:
                        </div>
                        <div className="editprofile__input">
                            <input type="text" className="editprofile__form"
                                Value={editedCustomer.firstName}
                                onChange={e => setFirstName(e.target.value)}
                                readOnly />
                        </div>
                    </div>
                    <div className="editprofile__content-item">
                        <div className="editprofile__lable">
                            LAST NAME:
                        </div>
                        <div className="editprofile__input">
                            <input type="text" className="editprofile__form"
                                Value={editedCustomer.lastName}
                                onChange={e => setLastName(e.target.value)}
                                readOnly />
                        </div>
                    </div>
                    <div className="editprofile_idtent-item">
                        <div className="editprofile__lable">
                            EMAIL:
                        </div>
                        <div className="editprofile__input">
                            <input type="text" className="editprofile__form"
                                Value={editedCustomer.email}
                                onChange={e => setEmail(e.target.value)}
                                readOnly />
                        </div>
                    </div>
                    <div className="editprofile_idtent-item">
                        <div className="editprofile__lable">
                            PHONE:
                        </div>
                        <div className="editprofile__input">
                            <input type="text" className="editprofile__form"
                                Value={editedCustomer.phone}
                                onChange={e => setPhone(e.target.value)}
                                readOnly />
                        </div>
                    </div>
                </div>
                {/* Modal Layout */}
                <div className={viewModal ? "modal--unactive" : "modal"}>
                    <div className="modal__overlay"></div>
                    <div className="modal__body">
                        <div style={{ display: "flex", "justify-content": "flex-end" }}>
                            <button
                                className="modal__btn-close"
                                onClick={() => setViewModal(!viewModal)}
                            >
                                X
                            </button>
                        </div>
                        {selectedButt === "editmember" ? (
                            <EditMember ModalState={callbackModal}
                                editedCustomer={editedCustomer}
                                requestData={requestData} setRequestData={setRequestData} />
                        ) : ""}
                    </div>
                </div>
            </>
        </>
    )
}

export default Profile
