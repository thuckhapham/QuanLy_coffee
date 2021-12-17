import React, { useState } from 'react'
import axios from 'axios'
import Error from '../../../Error/Error'
import './EditProfile.css'

function EditProfile(props) {
    const [checkError, setError] = useState("")
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");

    const [selectedRole, setRole] = useState(props.editedCustomer.role)
    const [selectedFirstName, setFirstName] = useState(props.editedCustomer.firstName)
    const [selectedLastName, setLastName] = useState(props.editedCustomer.lastName)
    const [selectedEmail, setEmail] = useState(props.editedCustomer.email)
    const [selectedPhone, setPhone] = useState("")

    const [viewList, setList] = useState([{ phone: 0, name: "", email: "" }]);

    //Sửa thông tin
    function editProfile() {
        axios({
            method: 'put',
            url: `http://localhost:5000/api/users/info`,
            data: {
                firstName: selectedFirstName,
                lastName: selectedLastName,
                email: selectedEmail,
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
            <div className="editcustomer__content">
                {checkError === "Error" ?
                    <>
                        {/* <div className="error__content">
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
                        </div> */}
                        <Error message="Please check the information again!" setError={setError} />
                    </>
                    :
                    <>
                        <div className="editcustomer__content-header">
                            EDIT PROFILE
                        </div>
                        <div className="editcustomer__content-list">
                            <div className="editcustomer__content-item">
                                <div className="editcustomer__lable">
                                    PROFILE ID:
                                </div>
                                <div className="editcustomer__input">
                                    <input type="text" className="editcustomer__form" placeholder="ID" value={props.editedCustomer._id} readOnly />
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
                            <div className="editcustomer__content-item">
                                <div className="editcustomer__lable">
                                    FIRST NAME:
                                </div>
                                <div className="editcustomer__input">
                                    <input type="text" className="editcustomer__form" Value={props.editedCustomer.firstName} onChange={e => setFirstName(e.target.value)} />
                                </div>
                            </div>
                            <div className="editcustomer__content-item">
                                <div className="editcustomer__lable">
                                    LAST NAME:
                                </div>
                                <div className="editcustomer__input">
                                    <input type="text" className="editcustomer__form" Value={props.editedCustomer.lastName} onChange={e => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="editcustomer_idtent-item">
                                <div className="editcustomer__lable">
                                    EMAIL:
                                </div>
                                <div className="editcustomer__input">
                                    <input type="text" className="editcustomer__form" Value={props.editedCustomer.email} onChange={e => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="editcustomer_idtent-item">
                                <div className="editcustomer__lable">
                                    PHONE:
                                </div>
                                <div className="editcustomer__input">
                                    <input type="text" className="editcustomer__form" Value={props.editedCustomer.phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="editcustomer__content-btn">
                            <button
                                className="editcustomer__btn editcustomer__btn--add"
                                onClick={() => {
                                    editProfile()
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

export default EditProfile
