import React, { useState } from 'react'
import './NewDrink.css'
import axios from 'axios'

function NewDrink(props) {
    //Lọc dữ liệu Category trùng
    const duplicateCheck = [];
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState);
    }
    //Nước mới
    const [selectedCate, setCate] = useState("COFFEE")
    const [selectedName, setName] = useState("")
    const [selectedPrice, setPrice] = useState("")
    //Thêm nước
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3ZTM3MTY1NzdhZmFmZjIxYTg2N2EiLCJ1c2VyTmFtZSI6ImFkbWluIiwicm9sZSI6Ik1BTkFHRVIiLCJpYXQiOjE2MzcwMzA3MDZ9.n7xU9TnyRp4vWxX5QmmAxD_GMTWf7YBVojLONdMAYYs";
    function addingDrink(selectedName, selectedCate, selectedPrice) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/products/',
            data: {
                name: selectedName,
                category: selectedCate,
                price: selectedPrice
            },
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(() => {
            props.setRequestData(new Date());
        })
    }
    return (
        <>
            <div className="newdrink__content">
                <div className="newdrink__content-header">
                    ADDING NEW DRINK
                </div>
                <div className="newdrink__content-list">
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            DRINK ID:
                        </div>
                        <div className="newdrink__input">
                            <input type="text" className="newdrink__form" placeholder="ID" />
                        </div>
                    </div>
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            CATEGORY:
                        </div>
                        <div className="newdrink__input">
                            <select id="category" className="newdrink__select"
                                onChange={(event) => setCate(event.target.value)}
                            >
                                {props.datas.map((data, index) => {
                                    if (duplicateCheck.includes(data.category))
                                        return null;
                                    duplicateCheck.push(data.category);
                                    return (
                                        <option
                                            value={data.category}
                                        >
                                            {data.category}
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
                            <input type="text" className="newdrink__form" placeholder="Drink's name" onChange={e => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="newdrink__content-item">
                        <div className="newdrink__lable">
                            PRICE:
                        </div>
                        <div className="newdrink__input">
                            <input type="text" className="newdrink__form" placeholder="Drink's price" onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="newdrink__content-btn">
                    <button
                        className="newdrink__btn newdrink__btn--add"
                        onClick={() => {
                            addingDrink(selectedName, selectedCate, selectedPrice)
                            sendData(true)
                        }}
                    >
                        Add
                    </button>
                    <button
                        className="newdrink__btn newdrink__btn--cancle"
                        onClick={() => {
                            sendData(true)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewDrink
