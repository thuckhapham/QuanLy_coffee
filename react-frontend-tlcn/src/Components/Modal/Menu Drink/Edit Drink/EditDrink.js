import React, { useState } from 'react'
import Error from '../../../Error/Error'
import './EditDrink.css'
import axios from 'axios'

function EditDrink(props) {
    const [checkError, setError] = useState("")
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    //Gửi dữ liệu về trang chính
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    //Nước sửa
    const selectedId = props.editedDrink[0]._id
    // const selectedCategory = props.editedDrink[0].category
    const [selectedName, setName] = useState(props.editedDrink[0].name)
    const [selectedPrice, setPrice] = useState(props.editedDrink[0].price)
    const [selectedCategory, setCategory] = useState(props.editedDrink[0].category)
    //Sửa nước
    function editDrink(selectedId, selectedCategory, selectedName, selectedPrice) {
        axios({
            method: 'put',
            url: 'http://localhost:5000/api/products/' + selectedId,
            data: {
                category: selectedCategory,
                name: selectedName,
                price: selectedPrice
            },
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then(() => {
            props.setRequestData(new Date());
            sendData(true)
        }).catch(function (error) {
            if (error.response) {
                setError("Error")
            }
        })
    }
    return (
      <>
        <div className="editdrink__content">
          {checkError === "Error" ? (
            <Error
              message="You dont' have the authority!"
              setError={setError}
            />
          ) : (
            <>
              <div className="editdrink__content-header">EDIT DRINK</div>
              <div className="editdrink__content-list">
                <div className="editdrink__content-item">
                  <div className="editdrink__lable">DRINK ID:</div>
                  <div className="editdrink__input">
                    <input
                      type="text"
                      className="editdrink__form"
                      placeholder="ID"
                      value={props.editedDrink[0]._id}
                      readOnly
                    />
                  </div>
                </div>
                <div className="editdrink__content-item">
                  <div className="editdrink__lable">CATEGORY:</div>
                  <div className="editdrink__input">
                    <select
                      id="category"
                      className="newdrink__select"
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <option value="TEA">TEA</option>
                      <option value="COFFEE">COFFEE</option>
                      <option value="COOKIES">COOKIES</option>
                      <option value="FRUIT">FRUIT</option>
                    </select>
                  </div>
                </div>
                <div className="editdrink__content-item">
                  <div className="editdrink__lable">NAME:</div>
                  <div className="editdrink__input">
                    <input
                      type="text"
                      className="editdrink__form"
                      placeholder="Drink's name"
                      defaultValue={props.editedDrink[0].name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="editdrink__content-item">
                  <div className="editdrink__lable">PRICE:</div>
                  <div className="editdrink__input">
                    <input
                      type="text"
                      className="editdrink__form"
                      placeholder="Drink's price"
                      defaultValue={props.editedDrink[0].price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="editdrink__content-btn">
                <button
                  className="editdrink__btn editdrink__btn--add"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    editDrink(
                      selectedId,
                      selectedCategory,
                      selectedName,
                      selectedPrice
                    );
                  }}
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
}
export default EditDrink
