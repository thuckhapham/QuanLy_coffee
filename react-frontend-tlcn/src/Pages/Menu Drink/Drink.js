import React, { useState, useEffect } from 'react'
import './Drink.css'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import * as GrIcons from 'react-icons/gr'
import NewDrink from '../../Components/Modal/Menu Drink/New Drink/NewDrink';
import DeleteDrink from '../../Components/Modal/Menu Drink/Delete Drink/DeleteDrink';
import EditDrink from '../../Components/Modal/Menu Drink/Edit Drink/EditDrink';

function Drink() {
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    //Save Drink Data to array
    const [editedDrink, setEditedDrink] = useState([{ drink_id: 0, drink_name: "loading" }]);
    //Lấy Data
    const [requestData, setRequestData] = useState(new Date());
    const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/products?page=1&pagesize=100`)
            .then((response) => {
                setList(response.data.products)
            })
    }, [requestData])
    //Lấy Data theo Cate
    const [viewCategory, setCategory] = useState("ALL")
    //Lấy Data theo ID
    const [viewID, setID] = useState("")
    function searchID(id) {
        if (id) {
            axios.get(`http://localhost:5000/api/products/${id}`)
                .then((response) => {
                    setList([response.data])
                })
        } else {
            axios.get(`http://localhost:5000/api/products?page=1&pagesize=100`)
                .then((response) => {
                    setList(response.data.products)
                })
        }
    }
    //Set Modal Active
    const [viewModal, setViewModal] = useState(true);
    const [selectedButt, setButt] = useState("");
    //Nhận dữ liệu truyền từ Modal con 
    const callbackModal = (modalState) => {
        setViewModal(modalState);
    };
    //Quy đổi số về tiền việt
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
    }
    return (
        <>
            <h1 className="">
                Drink Control
            </h1>
            <div className="drinktable__header-content">
                <div className="drinktable__header-list">
                    <div className="drinktable__header-item">
                        Drink ID:
                        <br />
                        <input type="text" className="drinksearch__form" placeholder="ID" value={viewID} onChange={e => setID(e.target.value)} />
                    </div>
                    <div className="drinktable__header-item">
                        Drink's name:
                        <br />
                        <input type="text" className="drinksearch__form" placeholder="ID" />
                    </div>
                </div>
                <div className="drinktable__header-search">
                    {/* <div className="drinktable__header-item drinktable__header-item--left">
                        Drink's price:
                        <br />
                        <input type="text" className="drinksearch__form" placeholder="ID" />
                    </div> */}
                    <div className="drinktable__header-item drinktable__header-item--left">
                        Drink's category:
                        <br />
                        <select id="category" className="drinksearch__form drinksearch__form--category"
                            onChange={(event) => setCategory(event.target.value)}
                        >
                            <option value="ALL">ALL</option>
                            <option value="TEA">TEA</option>
                            <option value="COFFEE">COFFEE</option>
                            <option value="COOKIES">COOKIES</option>
                            <option value="FRUIT">FRUIT</option>
                        </select>
                    </div>
                    <div className="drinktable__header-item drinktable__header-item--icon">
                        <AiIcons.AiOutlineSearch className="drinktable__header-search drinktable__header-searchicon"
                            onClick={() => searchID(viewID)}
                        />
                    </div>
                </div>
            </div>
            <div className="drinktable__header-btn">
                <button
                    className="drinktable__btn-add"
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
                            {/* <th>Drink Id</th> */}
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
                            {viewCategory == "ALL" ?
                                viewList.map((data, index) =>
                                (
                                    <tr className="drinktable__row">
                                        <td>{index + 1}</td>
                                        <td>{data.category}</td>
                                        <td>{data.name}</td>
                                        <td>{currencyFormat(data.price)}</td>
                                        <td>
                                            <button
                                                className="customer__btn-view"
                                                onClick={() => {
                                                    setButt("editdrink");
                                                    setViewModal(!viewModal)
                                                    setEditedDrink([data])
                                                }}
                                            >
                                                <GrIcons.GrCircleInformation className="customer__btn-viewicon" />
                                            </button>
                                            <button
                                                className="drinktable__btn-edit"
                                                onClick={() => {
                                                    setButt("editdrink");
                                                    setViewModal(!viewModal)
                                                    setEditedDrink([data])
                                                }}
                                            >
                                                <AiIcons.AiFillEdit className="drinktable__btn-editicon" />
                                            </button>
                                            <button
                                                className="drinktable__btn-cancel"
                                                onClick={() => {
                                                    setViewModal(!viewModal);
                                                    setButt("canceldrink")
                                                    setEditedDrink([data])
                                                }}
                                            >
                                                <GiIcons.GiCancel className="drinktable__btn-cancelicon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                :
                                viewList.map((data, index) =>
                                    data.category == viewCategory &&
                                    (
                                        <tr className="drinktable__row">
                                            <td>{index + 1}</td>
                                            <td>{data.category}</td>
                                            <td>{data.name}</td>
                                            <td>{currencyFormat(data.price)}</td>
                                            <td>
                                                <button
                                                    className="drinktable__btn-edit"
                                                    onClick={() => {
                                                        setButt("editdrink");
                                                        setViewModal(!viewModal)
                                                        setEditedDrink([data])
                                                    }}
                                                >
                                                    <AiIcons.AiFillEdit className="drinktable__btn-editicon" />
                                                </button>
                                                <button
                                                    className="drinktable__btn-cancel"
                                                    onClick={() => {
                                                        setViewModal(!viewModal);
                                                        setButt("canceldrink")
                                                        setEditedDrink([data])
                                                    }}
                                                >
                                                    <GiIcons.GiCancel className="drinktable__btn-cancelicon" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            }
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
                        <NewDrink tokenBearer={tokenBearer} ModalState={callbackModal} datas={viewList} setRequestData={setRequestData} />
                    ) : selectedButt === "canceldrink" ? (
                        <DeleteDrink tokenBearer={tokenBearer} ModalState={callbackModal} editedDrink={editedDrink} setRequestData={setRequestData} />
                    ) : <EditDrink tokenBearer={tokenBearer} ModalState={callbackModal} editedDrink={editedDrink} setRequestData={setRequestData} />}
                </div>
            </div>
        </>
    )
}

export default Drink
