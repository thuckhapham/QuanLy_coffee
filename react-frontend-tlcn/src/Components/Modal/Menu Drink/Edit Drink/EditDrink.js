import React, { useState } from 'react'
import './EditDrink.css'

function EditDrink(props) {
    //Lọc dữ liệu Category trùng
    const duplicateCheck = [];
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    console.log(props.editedDrink)
    return (
        <>
            <div className="newdrink__content">
                <div className="newdrink__content-header">
                    EDIT DRINK
                </div>
                <div className="newdrink__content-list">
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            DRINK ID:
                        </div>
                        <div className="newdrink__input">
                            <input type="text" className="newdrink__form" placeholder="ID" value={props.editedDrink[0].drink_id} />
                            {/* <input type="text" className="newdrink__form" placeholder="ID" /> */}
                        </div>
                    </div>
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            CATEGORY:
                        </div>
                        <div className="newdrink__input">
                            <select id="category" className="newdrink__select">
                                <option
                                    value={props.editedDrink[0].drink_category}
                                >
                                    {props.editedDrink[0].drink_category}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            NAME:
                        </div>
                        <div className="newdrink__input">
                            <input type="text" className="newdrink__form" placeholder="Drink's name" value={props.editedDrink[0].drink_name} />
                        </div>
                    </div>
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            PRICE:
                        </div>
                        <div className="newdrink__input">
                            <input type="text" className="newdrink__form" placeholder="Drink's price" defaultValue={props.editedDrink[0].drink_price} />
                        </div>
                    </div>
                </div>
                <div className="newdrink__content-btn">
                    <button
                        className="newdrink__btn newdrink__btn--add"
                        onClick={() => sendData(true)}
                    >
                        Edit
                    </button>
                    <button
                        className="newdrink__btn newdrink__btn--cancle"
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
