import React, { useState } from 'react'
import './EditDrink.css'

function EditDrink(props) {
    //Lọc dữ liệu Category trùng
    const duplicateCheck = [];
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    return (
        <>
            <div className="newdrink__content">
                <div className="newdrink__content-header">
                    EDIT DRINK
                </div>
                <div className="newdrink__content-list">
                    {/* {props.editedDrink.map((drink, index) => ( */}
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            DRINK ID:
                        </div>
                        <div className="newdrink__input">
                            <input type="text" className="newdrink__form" placeholder="ID" />
                        </div>
                    </div>
                    {/* ))} */}
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            CATEGORY:
                        </div>
                        <div className="newdrink__input">
                            <select id="category" className="newdrink__select">
                                {props.datas.map((data, index) => {
                                    if (duplicateCheck.includes(data.drink_category))
                                        return null;
                                    duplicateCheck.push(data.drink_category);
                                    return (
                                        <option
                                            value={data.drink_category}
                                        >
                                            {data.drink_category}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            NAME:
                        </div>
                        <div className="newdrink__input">
                            <input type="text" className="newdrink__form" placeholder="Drink's name" />
                        </div>
                    </div>
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            PRICE:
                        </div>
                        <div className="newdrink__input">
                            <input type="text" className="newdrink__form" placeholder="Drink's price" />
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
