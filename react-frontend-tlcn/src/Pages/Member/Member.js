import React, { useState } from 'react'
import './Member.css'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import * as GrIcons from 'react-icons/gr'
import EditMember from '../../Components/Modal/Member/Edit Member/EditMember'
import DeleteMember from '../../Components/Modal/Member/Delete Member/DeleteMember'
import ViewMember from '../../Components/Modal/Member/View Member/ViewMember'
import NewCustomer from '../../Components/Modal/Member/New Customer/NewCustomer'

function Member() {
    const datas = [
        {
            customer_id: "CUS01",
            customer_name: "Doan Hieu",
            customer_address: "Phan Xich Long",
            customer_phone: 39000,
        },
        {
            customer_id: "CUS02",
            customer_name: "Thuc Kha",
            customer_address: "Phan Xich Long",
            customer_phone: 35000,
        },
        {
            customer_id: "CUS03",
            customer_name: "Tuan Kiet",
            customer_address: "Phan Xich Long",
            customer_phone: 35000,
        },
        {
            customer_id: "FRUIT01",
            customer_name: "Peach Tea",
            customer_address: "FRUIT",
            customer_phone: 55000,
        },
        {
            customer_id: "FRUIT02",
            customer_name: "Oolong Tea",
            customer_address: "FRUIT",
            customer_phone: 55000,
        },
        {
            customer_id: "FRUIT03",
            customer_name: "Macchiato Tea",
            customer_address: "FRUIT",
            customer_phone: 55000,
        },
    ];
    //Set Modal Active
    const [viewModal, setViewModal] = useState(true);
    const [selectedButt, setButt] = useState("");
    const callbackModal = (modalState) => {
        setViewModal(modalState);
    };
    //Save Customer Data to array
    const [editedCustomer, setEditedCustomer] = useState([{ customer_id: 0, customer_name: "loading" }]);

    return (
        <>
            <div className="member">
                <h2>Member</h2>
                <div className="customer__header-content">
                    <div className="customer__header-list">
                        <div className="customer__header-item">
                            Member ID:
                            <br />
                            <input type="text" className="drinksearch__form" placeholder="ID" />
                        </div>
                        <div className="customer__header-item">
                            Name:
                            <br />
                            <input type="text" className="drinksearch__form" placeholder="Member's name" />
                        </div>
                    </div>
                    <div className="customer__header-search">
                        <div className="customer__header-item customer__header-item--left">
                            Phone:
                            <br />
                            <input type="text" className="drinksearch__form" placeholder="Member's phone" />
                        </div>
                        <div className="customer__header-item customer__header-item--icon">
                            <AiIcons.AiOutlineSearch className="customer__header-search customer__header-searchicon" />
                        </div>
                    </div>
                </div>
                <div className="customer__header-btn">
                    <button
                        className="customer__btn-add"
                        onClick={() => {
                            setViewModal(!viewModal)
                            setButt("newcustomer")
                        }}
                    >
                        + NEW MEMBER
                    </button>
                </div>
                <div className="customer__table-header">
                    <table className="customer__table">
                        <thead className="customer__head">
                            <tr className="customer__header">
                                <th>Number</th>
                                <th>Customer Id</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="customer__detail">
                    <div className="customer__table-content">
                        <table className="customer__table">
                            <tbody className="customer__body">
                                {datas.map((data, index) => (
                                    <tr className="customer__row">
                                        <td>{index + 1}</td>
                                        <td>{data.customer_id}</td>
                                        <td>{data.customer_name}</td>
                                        <td>{data.customer_phone}</td>
                                        <td>
                                            <button
                                                className="customer__btn-view"
                                                onClick={() => {
                                                    setButt("viewcustomer");
                                                    setViewModal(!viewModal)
                                                    setEditedCustomer([data])
                                                }}
                                            >
                                                <GrIcons.GrCircleInformation className="customer__btn-viewicon" />
                                            </button>
                                            <button
                                                className="customer__btn-edit"
                                                onClick={() => {
                                                    setButt("editcustomer");
                                                    setViewModal(!viewModal)
                                                    setEditedCustomer([data])
                                                }}
                                            >
                                                <AiIcons.AiFillEdit className="customer__btn-editicon" />
                                            </button>
                                            <button
                                                className="customer__btn-cancel"
                                                onClick={() => {
                                                    setViewModal(!viewModal);
                                                    setButt("cancelcustomer")
                                                    setEditedCustomer([data])
                                                }}
                                            >
                                                <GiIcons.GiCancel className="customer__btn-cancelicon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                    {selectedButt === "cancelcustomer" ? (
                        <DeleteMember ModalState={callbackModal} editedCustomer={editedCustomer} />
                    ) : selectedButt === "editcustomer" ? (
                        <EditMember ModalState={callbackModal} datas={datas} editedCustomer={editedCustomer} />
                    ) : selectedButt === "newcustomer" ? <NewCustomer ModalState={callbackModal} /> :
                        <ViewMember ModalState={callbackModal} datas={datas} editedCustomer={editedCustomer} />}
                </div>
            </div>
        </>
    )
}

export default Member
