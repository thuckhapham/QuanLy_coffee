import React from 'react'
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
                    CUSTOMER INFORMATION
                </div>
                <div className="viewcustomer__content-list">
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            CUSTOMER ID:
                        </div>
                        <div className="viewcustomer__input">
                            {props.editedCustomer[0].customer_id}
                        </div>
                    </div>
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            NAME:
                        </div>
                        <div className="viewcustomer__input">
                            {props.editedCustomer[0].customer_name}
                        </div>
                    </div>
                    <div className="viewcustomer__content-item">
                        <div className="viewcustomer__lable">
                            ADDRESS:
                        </div>
                        <div className="viewcustomer__input">
                            {props.editedCustomer[0].customer_address}
                        </div>
                    </div>
                    <div className="viewcustomer_idtent-item">
                        <div className="viewcustomer__lable">
                            PHONE:
                        </div>
                        <div className="viewcustomer__input">
                            {props.editedCustomer[0].customer_phone}
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
