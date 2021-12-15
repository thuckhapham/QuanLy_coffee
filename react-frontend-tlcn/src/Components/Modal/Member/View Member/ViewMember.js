import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ViewMember.css'

function ViewMember(props) {
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    const [viewList, setList] = useState([{ phone: 0, name: "" }]);
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
    return (
        <>
            <div className="viewcustomer__content">
                <div className="viewcustomer__content-header">
                    MEMBER INFORMATION
                </div>
                <div className="viewcustomer__content-list">
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            MEMBER ID:
                        </div>
                        <div className="viewcustomer__input">
                            {viewList._id}
                        </div>
                    </div>
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            ROLE:
                        </div>
                        <div className="viewcustomer__input">
                            {viewList.role}
                        </div>
                    </div>
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            LAST NAME:
                        </div>
                        <div className="viewcustomer__input">
                            {viewList.lastName}
                        </div>
                    </div>
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            PHONE:
                        </div>
                        <div className="viewcustomer__input">
                            {viewList.phone}
                        </div>
                    </div>
                    <div className="viewcustomer_idtent-item">
                        <div className="viewcustomer__lable">
                            EMAIL:
                        </div>
                        <div className="viewcustomer__input">
                            {viewList.email}
                        </div>
                    </div>
                </div>
                <div className="viewcustomer__content-btn">
                    <button
                        className="viewcustomer__btn viewcustomer__btn--close"
                        onClick={() => sendData(true)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default ViewMember
