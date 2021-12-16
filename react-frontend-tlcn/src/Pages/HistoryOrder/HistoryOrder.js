import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as GiIcons from 'react-icons/gi'
import * as AiIcons from 'react-icons/ai'
import './HistoryOrder.css'

function HistoryOrder() {
    //Lấy Bearer Token
    const tokenBearer = localStorage.getItem("tokenBearer");
    // Lấy dữ liệu order
    const [viewList, setList] = useState([{ phone: 0, name: "", total: 0 }]);
    const [requestData, setRequestData] = useState(new Date());
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/order/?pagesize=100`,
            headers: {
                'Authorization': `bearer ${tokenBearer}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            setList(response.data.orders.reverse())
        })
    }, [requestData])
    //Lấy Data theo ID
    const [viewID, setID] = useState("")
    function orderID() {
        if (viewID) {
            axios({
                method: 'get',
                url: `http://localhost:5000/api/order/${viewID}`,
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
                url: `http://localhost:5000/api/order/?pagesize=100`,
                headers: {
                    'Authorization': `bearer ${tokenBearer}`,
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => {
                    setList(response.data.orders.reverse())
                })
        }
    }
    // Hủy order
    function cancelOrder(id) {
        if (id) {
            axios({
                method: 'delete',
                url: `http://localhost:5000/api/order/${id}`,
                headers: {
                    'Authorization': `bearer ${tokenBearer}`,
                    'Content-Type': 'application/json'
                },
            }).then(() => {
                setRequestData(new Date())
            })
        }
    }
    //Quy đổi số về tiền việt
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
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
            <div className="historyorder">
                <div className="historyorder__top">
                    <div className="historyorder__title">
                        History Order
                    </div>
                    {/* <div className="historyorder__time-list">
                        <div className="historyorder__time-item">
                            From
                            <br />
                            <input type="date" className="" id="datefrom" name="datefrom" />
                        </div>
                        <div className="historyorder__time-item">
                            To
                            <br />
                            <input type="date" className="" id="dateto" name="dateto" />
                        </div>
                    </div> */}
                    <div className="historyorder__orderid">
                        Order Id:
                        <input type="text" className="historyorder__orderid historyorder__orderid-input" id="orderid" name="orderid" placeholder="   
                        Order ID" value={viewID} onChange={e => setID(e.target.value)} />
                        <AiIcons.AiOutlineSearch className="historyorder__orderid historyorder__orderid-icon" onClick={() => orderID()} />
                    </div>
                </div>
                <div className="historyorder__table-header">
                    <table className="historyorder__table">
                        <thead className="historyorder__head">
                            <tr className="historyorder__header">
                                <th>Number</th>
                                <th>Table Id</th>
                                <th>Total</th>
                                <th>Time</th>
                                <th>State</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="historyorder__detail">
                    <div className="historyorder__table-content">
                        <table className="historyorder__table">
                            <tbody className="historyorder__body">
                                {viewList.map((data, index) => (
                                    <tr className="historyorder__row">
                                        <td>{index + 1}</td>
                                        <td>{data.table}</td>
                                        <td>{currencyFormat(data.total)}</td>
                                        <td>{formattedDate(data.updated)}</td>
                                        <td>{data.status ? "True" : "False"}</td>
                                        <td>
                                            <button
                                                className="historyoder__btn-cancel"
                                                onClick={() => {
                                                    console.log(data._id)
                                                    cancelOrder(data._id)
                                                }}
                                            >
                                                Cancel
                                                <GiIcons.GiCancel className="historyoder__btn-cancelicon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HistoryOrder
