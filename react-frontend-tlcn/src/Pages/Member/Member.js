import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Member.css'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import * as GrIcons from 'react-icons/gr'
import EditMember from '../../Components/Modal/Member/Edit Member/EditMember'
import DeleteMember from '../../Components/Modal/Member/Delete Member/DeleteMember'
import ViewMember from '../../Components/Modal/Member/View Member/ViewMember'
import NewCustomer from '../../Components/Modal/Member/New Customer/NewCustomer'

function Member() {
    const [requestData, setRequestData] = useState(new Date());
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    const [viewList, setList] = useState([{ phone: 0, name: "" }]);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/users',
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            setList(response.data)
        })
    }, [requestData])
    //Set Modal Active
    const [viewModal, setViewModal] = useState(true);
    const [selectedButt, setButt] = useState("");
    const callbackModal = (modalState) => {
        setViewModal(modalState);
    };
    //Save Customer Data to array
    const [editedCustomer, setEditedCustomer] = useState([{ customer_id: 0, customer_name: "loading" }]);
    function saveCustomer(cusId) {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/users/${cusId}`,
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            setEditedCustomer(response.data)
        })
    }
    //Tìm ID
    const [findId, setFindId] = useState("")
    function findMember() {
        if (findId) {
            axios({
                method: 'get',
                url: `http://localhost:5000/api/users/${findId}`,
                headers: {
                    'Authorization': `bearer ${tokenBearer}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                setList([response.data])
            })
        } else {
            axios({
                method: 'get',
                url: 'http://localhost:5000/api/users',
                headers: {
                    'Authorization': `bearer ${tokenBearer}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                setList(response.data)
            })
        }
    }
    function formattedDate(date) {
        var dateObj = new Date(date);
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = day + "/" + month + "/" + year;
        return newdate;
    }
    return (
        <>
            <div className="member">
                <h2>Member</h2>
                <div className="customer__header-content">
                    <div className="customer__header-list">
                        <div className="customer__header-item">
                            Member ID:
                            <br />
                            <input type="text" className="drinksearch__form" placeholder="ID" onChange={e => setFindId(e.target.value)} />
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
                        <div className="customer__header-item customer__header-item--icon" onClick={() => findMember()}>
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
                                <th>Username</th>
                                <th>Name</th>
                                <th>State</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="customer__detail">
                    <div className="customer__table-content">
                        <table className="customer__table">
                            <tbody className="customer__body">
                                {viewList.map((data, index) => (
                                    <tr className="customer__row" key={data._id}>
                                        <td>{index + 1}</td>
                                        <td>{data.userName}</td>
                                        <td>{data.lastName}</td>
                                        <td>{data.enable == true ? "Active" : "Deactive"}</td>
                                        <td>{formattedDate(data.created)}</td>
                                        <td>
                                            <button
                                                className="customer__btn-view"
                                                onClick={() => {
                                                    setButt("viewcustomer");
                                                    setViewModal(!viewModal)
                                                    saveCustomer(data._id)
                                                }}
                                            >
                                                <GrIcons.GrCircleInformation className="customer__btn-viewicon" />
                                            </button>
                                            <button
                                                className="customer__btn-edit"
                                                onClick={() => {
                                                    setButt("editcustomer");
                                                    setViewModal(!viewModal)
                                                    saveCustomer(data._id)
                                                }}
                                            >
                                                <AiIcons.AiFillEdit className="customer__btn-editicon" />
                                            </button>
                                            <button
                                                className="customer__btn-cancel"
                                                onClick={() => {
                                                    setViewModal(!viewModal);
                                                    setButt("cancelcustomer")
                                                    saveCustomer(data._id)
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
                        <DeleteMember ModalState={callbackModal} editedCustomer={editedCustomer} setRequestData={setRequestData} />
                    ) : selectedButt === "editcustomer" ? (
                        <EditMember ModalState={callbackModal} editedCustomer={editedCustomer} requestData={requestData} setRequestData={setRequestData} />
                    ) : selectedButt === "newcustomer" ? <NewCustomer ModalState={callbackModal} setRequestData={setRequestData} /> :
                        <ViewMember ModalState={callbackModal} editedCustomer={editedCustomer} />}
                </div>
            </div>
        </>
    )
}

export default Member
