import React, { useState } from 'react'
import './EditDrink.css'

function EditDrink(props) {
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    console.log(props.editedDrink)
    return (
        <>
            <div className="editdrink__content">
                <div className="editdrink__content-header">
                    EDIT DRINK
                </div>
                <div className="editdrink__content-list">
                    <div className="editdrink__content-item">
                        <div className="editdrink__lable">
                            DRINK ID:
                        </div>
                        <div className="editdrink__input">
                            <input type="text" className="editdrink__form" placeholder="ID" value={props.editedDrink[0].drink_id} readOnly />
                        </div>
                    </div>
                    <div className="editdrink__content-item">
                        <div className="editdrink__lable">
                            CATEGORY:
                        </div>
                        <div className="editdrink__input">
                            <select id="category" className="editdrink__select">
                                <option
                                    value={props.editedDrink[0].drink_category}
                                >
                                    {props.editedDrink[0].drink_category}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="editdrink__content-item">
                        <div className="editdrink__lable">
                            NAME:
                        </div>
                        <div className="editdrink__input">
                            <input type="text" className="editdrink__form" placeholder="Drink's name" value={props.editedDrink[0].drink_name} readOnly />
                        </div>
                    </div>
                    <div className="editdrink__content-item">
                        <div className="editdrink__lable">
                            PRICE:
                        </div>
                        <div className="editdrink__input">
                            <input type="text" className="editdrink__form" placeholder="Drink's price" defaultValue={props.editedDrink[0].drink_price} />
                        </div>
                    </div>
                </div>
                <div className="editdrink__content-btn">
                    <button
                        className="editdrink__btn editdrink__btn--add"
                        onClick={() => sendData(true)}
                    >
                        Edit
                    </button>
                    <button
                        className="editdrink__btn editdrink__btn--cancle"
                        onClick={() => sendData(true)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}
export default EditDrink
