import React, { useState, useEffect } from 'react'
import './Drink.css'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import NewDrink from '../../Components/Modal/Menu Drink/New Drink/NewDrink';
import DeleteDrink from '../../Components/Modal/Menu Drink/Delete Drink/DeleteDrink';
import EditDrink from '../../Components/Modal/Menu Drink/Edit Drink/EditDrink';

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
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    //Save Drink Data to array
    const [editedDrink, setEditedDrink] = useState([{ drink_id: 0, drink_name: "loading" }]);
    //Lấy Data
    const [requestData, setRequestData] = useState(new Date());
    const [viewList, setList] = useState([{ phone: 0, name: "", price: 0 }]);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/products` + "?page=" + 1 + "&pagesize=" + 10)
            .then((response) => {
                setList(response.data.products)
            })
    }, [requestData])
    //Lấy Data theo ID
    const [viewID, setID] = useState("")
    function searchID(id) {
        if (id) {
            axios.get(`http://localhost:5000/api/products/` + id)
                // axios.get(`http://localhost:5000/api/products/6171315950c326ba1d1278ff`)
                .then((response) => {
                    setList([response.data])
                    // console.log(id)
                    console.log(response.data)
                })
        } else {
            axios.get(`http://localhost:5000/api/products` + "?page=" + 1 + "&pagesize=" + 10)
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
                    <div className="drinktable__header-item drinktable__header-item--left">
                        Drink's price:
                        <br />
                        <input type="text" className="drinksearch__form" placeholder="ID" />
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
                            {viewList.map((data, index) => (
                                <tr className="drinktable__row">
                                    <td>{index + 1}</td>
                                    {/* <td>{data.drink_id}</td> */}
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
                        <NewDrink tokenBearer={tokenBearer} ModalState={callbackModal} datas={viewList} setRequestData={setRequestData} />
                    ) : selectedButt === "canceldrink" ? (
                        <DeleteDrink tokenBearer={tokenBearer} ModalState={callbackModal} editedDrink={editedDrink} setRequestData={setRequestData} />
                    ) : <EditDrink ModalState={callbackModal} datas={datas} editedDrink={editedDrink} />}
                </div>
            </div>
        </>
    )
}

export default Drink
