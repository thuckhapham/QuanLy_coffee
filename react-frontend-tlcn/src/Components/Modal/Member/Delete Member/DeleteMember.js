import React from 'react'
import './DeleteMember.css'
import * as AiIcons from 'react-icons/ai'
function DeleteMember(props) {
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    return (
        <>
            <div className="deletemember">
                <div className="deletemember__content">
                    <h2 className="deletemember__content--warn">
                        WARNING
                        <AiIcons.AiFillWarning className="deletemember__content deletemember__content-icon" />
                    </h2>

                    Do you really want to delete {props.editedCustomer[0].customer_name}?
                </div>
                <div className="deletemember__footer">
                    <button className="deletemember__btn deletemember__btn-confirm" onClick={() => sendData(true)}>
                        Confirm
                    </button>
                    <button className="deletemember__btn deletemember__btn-cancel" onClick={() => sendData(true)}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteMember
