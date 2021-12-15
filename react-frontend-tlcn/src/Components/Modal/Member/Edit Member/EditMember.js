import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './EditMember.css'

function EditMember(props) {
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");

    const [selectedFirstName, setFirstName] = useState(props.editedCustomer[0].firstName)
    const [selectedLastName, setLastName] = useState(props.editedCustomer[0].lastName)
    const [selectedEmail, setEmail] = useState(props.editedCustomer[0].email)
    const [selectedPhone, setPhone] = useState("")

    const [viewList, setList] = useState([{ phone: 0, name: "", email: "" }]);
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/users/${props.editedCustomer[0]._id}`,
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            setList(response.data)
        })
    }, [])
    //Sửa thông tin
    function editMember() {
        axios({
            method: 'put',
            url: `http://localhost:5000/api/users/${viewList._id}`,
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
                            <input type="text" className="editcustomer__form" placeholder="ID" value={viewList._id} readOnly />
                        </div>
                    </div>
                    <div className="editcustomer__content-item">
                        <div className="editcustomer__lable">
                            FIRST NAME:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" placeholder="Customer's name" defaultValue={viewList.firstName} onChange={e => setFirstName(e.target.value)} />
                        </div>
                    </div>
                    <div className="editcustomer__content-item">
                        <div className="editcustomer__lable">
                            LAST NAME:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" placeholder="Customer's address" defaultValue={viewList.lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="editcustomer_idtent-item">
                        <div className="editcustomer__lable">
                            EMAIL:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" placeholder="Customer's phone" defaultValue={viewList.email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="editcustomer_idtent-item">
                        <div className="editcustomer__lable">
                            PHONE:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" placeholder="Customer's phone" defaultValue={viewList.phone} onChange={e => setPhone(e.target.value)} />
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
