import React, { useState } from 'react'
import './Drink.css'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import NewDrink from '../../Components/Modal/New Drink/NewDrink';
import DeleteDrink from '../../Components/Modal/Delete Drink/DeleteDrink';

function Drink() {
    const datas = [
        {
            drink_id: "COFFEE01",
            drink_category: "COFFEE",
            drink_name: "Black Coffee",
            drink_price: 39000,
        },
        {
            drink_id: "TEA01",
            drink_category: "TEA",
            drink_name: "Milk Coffee",
            drink_price: 35000,
        },
        {
            drink_id: "COOKIES02",
            drink_category: "COOKIES",
            drink_name: "Brown Coffee",
            drink_price: 35000,
        },
        {
            drink_id: "FRUIT01",
            drink_category: "FRUIT",
            drink_name: "Peach Tea",
            drink_price: 55000,
        },
        {
            drink_id: "FRUIT02",
            drink_category: "FRUIT",
            drink_name: "Oolong Tea",
            drink_price: 55000,
        },
        {
            drink_id: "FRUIT03",
            drink_category: "FRUIT",
            drink_name: "Macchiato Tea",
            drink_price: 55000,
        },
    ];
    //Set Modal Active
    const [viewModal, setViewModal] = useState(true);
    const [selectedButt, setButt] = useState("");
    const callbackModal = (modalState) => {
        setViewModal(modalState);
    };
    return (
        <>
            <div className="homepage__header-item homepage__header-btn">
                <button
                    className="homepage__btn-add"
                    onClick={() => {
                        setViewModal(!viewModal)
                        setButt("newdrink")
                    }}
                >
                    + NEW DRINK
                </button>
            </div>
            <div className="drinktable__table-header">
                <table className="drinktable__table">
                    <thead className="drinktable__head">
                        <tr className="drinktable__header">
                            <th>Number</th>
                            <th>Drink Id</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="drinktable__detail">
                <div className="drinktable__table-content">
                    <table className="drinktable__table">
                        <tbody className="drinktable__body">
                            {datas.map((data, index) => (
                                <tr className="drinktable__row">
                                    <td>{index + 1}</td>
                                    <td>{data.drink_id}</td>
                                    <td>{data.drink_category}</td>
                                    <td>{data.drink_name}</td>
                                    <td>{data.drink_price}</td>
                                    <td>
                                        <button
                                            className="drinktable__btn-edit"
                                            onClick={() => {
                                                setButt("editdrink");
                                                setViewModal(!viewModal)
                                            }}
                                        >
                                            <AiIcons.AiFillEdit className="drinktable__btn-editicon" />
                                        </button>
                                        <button
                                            className="drinktable__btn-cancel"
                                            onClick={() => {
                                                setViewModal(!viewModal);
                                                setButt("canceldrink")
                                            }}
                                        >
                                            <GiIcons.GiCancel className="drinktable__btn-cancelicon" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                    {selectedButt === "newdrink" ? (
                        <NewDrink ModalState={callbackModal} datas={datas} />
                    ) : selectedButt === "canceldrink" ? (
                        <DeleteDrink ModalState={callbackModal} />
                    ) : ""}
                </div>
            </div>
        </>
    )
}

export default Drink
