import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ViewMember.css'

function ViewMember(props) {
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
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
                            {props.editedCustomer._id}
                        </div>
                    </div>
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            STATE:
                        </div>
                        <div className={props.editedCustomer.enable == true ? "viewcustomer__input viewcustomer__input--active" : "viewcustomer__input viewcustomer__input--deactive"}>
                            {props.editedCustomer.enable == true ? "ACTIVE" : "DEACTIVE"}
                        </div>
                    </div>
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            ROLE:
                        </div>
                        <div className="viewcustomer__input">
                            {props.editedCustomer.role}
                        </div>
                    </div>
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            LAST NAME:
                        </div>
                        <div className="viewcustomer__input">
                            {props.editedCustomer.lastName}
                        </div>
                    </div>
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            PHONE:
                        </div>
                        <div className="viewcustomer__input">
                            {props.editedCustomer.phone}
                        </div>
                    </div>
                    <div className="viewcustomer_idtent-item">
                        <div className="viewcustomer__lable">
                            EMAIL:
                        </div>
                        <div className="viewcustomer__input">
                            {props.editedCustomer.email}
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
