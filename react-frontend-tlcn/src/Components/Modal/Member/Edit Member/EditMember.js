import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './EditMember.css'

function EditMember(props) {
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
    function editMember() {
        axios({
            method: 'put',
            url: `http://localhost:5000/api/users/${props.editedCustomer._id}`,
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
        })
    }
    return (
        <>
            <div className="editcustomer__content">
                <div className="editcustomer__content-header">
                    EDIT MEMBER
                </div>
                <div className="editcustomer__content-list">
                    <div className="editcustomer__content-item">
                        <div className="editcustomer__lable">
                            MEMBER ID:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" placeholder="ID" value={props.editedCustomer._id} readOnly />
                        </div>
                    </div>
                    <div className="newcustomer__content-item">
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
                    </div>
                    <div className="editcustomer__content-item">
                        <div className="editcustomer__lable">
                            FIRST NAME:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" defaultValue={props.editedCustomer.firstName} onChange={e => setFirstName(e.target.value)} />
                        </div>
                    </div>
                    <div className="editcustomer__content-item">
                        <div className="editcustomer__lable">
                            LAST NAME:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" defaultValue={props.editedCustomer.lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="editcustomer_idtent-item">
                        <div className="editcustomer__lable">
                            EMAIL:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" defaultValue={props.editedCustomer.email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="editcustomer_idtent-item">
                        <div className="editcustomer__lable">
                            PHONE:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" defaultValue={props.editedCustomer.phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="editcustomer__content-btn">
                    <button
                        className="editcustomer__btn editcustomer__btn--add"
                        onClick={() => {
                            sendData(true)
                            editMember()
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="editcustomer__btn editcustomer__btn--cancle"
                        onClick={() => sendData(true)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}
export default EditMember
