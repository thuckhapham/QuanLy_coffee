import React, { useState } from 'react'
import './Homepage.css'
import { Link } from 'react-router-dom'
import Login from '../../Components/Login/Login'

function Homepage() {
    //Data
    const datas = [
        {
            tableId: "POIN1",
            tableSource: "Table"
        },
        {
            tableId: "POIN2",
            tableSource: "Table"
        },
        {
            tableId: "POIN3",
            tableSource: "Table"
        },
        {
            tableId: "POIN4",
            tableSource: "Table"
        },
        {
            tableId: "POIN5",
            tableSource: "Table"
        },
    ]
    //Set Modal Active
    const [viewModal, setViewModal] = useState(true);
    const callbackModal = (modalState) => {
        setViewModal(modalState);
    };
    return (
        <>
            <Login />
            <div className="homepage">
                <div className="homepage__header-list">
                    {/* <div className="homepage__header-item homepage__header-item--title">
                        HOMEPAGE
                    </div> */}
                    <div className="homepage__header-item homepage__header-btn">
                        <button
                            className="homepage__btn-add"
                            onClick={() => setViewModal(!viewModal)}
                        >
                            + CREATE TABLE
                        </button>
                    </div>
                </div>
                <div className="homepage__contain">
                    {datas.map(data => (
                        <Link key={data.tableId} className="homepage__order-link" to={"/order/" + data.tableId} >
                            {data.tableId}
                        </Link>
                    ))}
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
                    <div className="newtable__content">
                        <div className="newtable__content-header">
                            CREATING NEW TABLE
                        </div>
                        <div className="newtable__content-list">
                            <div className="newtable__content-item">
                                <div className="newtable__lable">
                                    TABLE ORDER:
                                </div>
                                <div className="newtable__input">
                                    <input type="text" className="newtable__form" placeholder="ID" />
                                </div>
                            </div>
                            <div className="newtable__content-item">
                                <div className="newtable__lable">
                                    TABLE SOURCE:
                                </div>
                                <div className="newtable__input">
                                    <input type="text" className="newtable__form" placeholder="Source" />
                                </div>
                            </div>
                        </div>
                        <div className="newtable__content-btn">
                            <button
                                className="newtable__btn newtable__btn--add"
                                onClick={() => setViewModal(!viewModal)}
                            >
                                Add
                            </button>
                            <button
                                className="newtable__btn newtable__btn--cancle"
                                onClick={() => setViewModal(!viewModal)}
                            >
                                Cancle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div>  */}
        </>
    )
}

export default Homepage
