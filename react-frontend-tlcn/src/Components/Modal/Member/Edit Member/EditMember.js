import React from 'react'
import './EditMember.css'

function EditMember(props) {
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    return (
        <>
            <div className="editcustomer__content">
                <div className="editcustomer__content-header">
                    EDIT CUSTOMER
                </div>
                <div className="editcustomer__content-list">
                    <div className="editcustomer__content-item">
                        <div className="editcustomer__lable">
                            CUSTOMER ID:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" placeholder="ID" value={props.editedCustomer[0].customer_id} readOnly />
                        </div>
                    </div>
                    <div className="editcustomer__content-item">
                        <div className="editcustomer__lable">
                            NAME:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" placeholder="Customer's name" defaultValue={props.editedCustomer[0].customer_name} />
                        </div>
                    </div>
                    <div className="editcustomer__content-item">
                        <div className="editcustomer__lable">
                            ADDRESS:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" placeholder="Customer's address" defaultValue={props.editedCustomer[0].customer_address} />
                        </div>
                    </div>
                    <div className="editcustomer_idtent-item">
                        <div className="editcustomer__lable">
                            PHONE:
                        </div>
                        <div className="editcustomer__input">
                            <input type="text" className="editcustomer__form" placeholder="Customer's phone" defaultValue={props.editedCustomer[0].customer_phone} />
                        </div>
                    </div>
                </div>
                <div className="editcustomer__content-btn">
                    <button
                        className="editcustomer__btn editcustomer__btn--add"
                        onClick={() => sendData(true)}
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
