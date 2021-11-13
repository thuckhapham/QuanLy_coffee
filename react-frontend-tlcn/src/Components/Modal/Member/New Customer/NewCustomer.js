import React from 'react'
import './NewCustomer.css'

function NewCustomer(props) {
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    return (
        <>
            <div className="newcustomer__content">
                <div className="newcustomer__content-header">
                    NEW CUSTOMER
                </div>
                <div className="newcustomer__content-list">
                    <div className="newcustomer__content-item">
                        <div className="newcustomer__lable">
                            CUSTOMER ID:
                        </div>
                        <div className="newcustomer__input">
                            <input type="text" className="newcustomer__form" placeholder="ID" />
                        </div>
                    </div>
                    <div className="newcustomer__content-item">
                        <div className="newcustomer__lable">
                            NAME:
                        </div>
                        <div className="newcustomer__input">
                            <input type="text" className="newcustomer__form" placeholder="Customer's name" />
                        </div>
                    </div>
                    <div className="newcustomer__content-item">
                        <div className="newcustomer__lable">
                            ADDRESS:
                        </div>
                        <div className="newcustomer__input">
                            <input type="text" className="newcustomer__form" placeholder="Customer's address" />
                        </div>
                    </div>
                    <div className="newcustomer_idtent-item">
                        <div className="newcustomer__lable">
                            PHONE:
                        </div>
                        <div className="newcustomer__input">
                            <input type="text" className="newcustomer__form" placeholder="Customer's phone" />
                        </div>
                    </div>
                </div>
                <div className="newcustomer__content-btn">
                    <button
                        className="newcustomer__btn newcustomer__btn--add"
                        onClick={() => sendData(true)}
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
            </div>
        </>
    )
}

export default NewCustomer
