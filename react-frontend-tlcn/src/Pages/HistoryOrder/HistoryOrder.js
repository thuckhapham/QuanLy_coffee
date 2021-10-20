import React, { useState, useEffect } from 'react'
import * as GiIcons from 'react-icons/gi'
import * as AiIcons from 'react-icons/ai'
import './HistoryOrder.css'

function HistoryOrder() {
    const datas = [
        {
            orderid: "A2",
            total: 39000,
            time: "29/6/2021",
            status: "DONE"
        },
        {
            orderid: "A3",
            total: 55000,
            time: "29/6/2021",
            status: "DONE"
        },
        {
            orderid: "A5",
            total: 75000,
            time: "29/6/2021",
            status: "DONE"
        }
    ]
    const [useStatus, setStatus] = useState(datas)
    // const [useStatus, setStatus] = useState(datas)
    console.log(useStatus)
    const onClickHandle = (id) => {
        console.log(id)
        let updatedList = datas.map(data => {
            if (data.orderid === id) {
                return { ...data, status: "CANCEL" };
            }
            return data;
        })
        setStatus(updatedList)
    }
    return (
        <>
            <div className="historyorder">
                <div className="historyorder__top">
                    <div className="historyorder__title">
                        History Order
                    </div>
                    <div className="historyorder__time-list">
                        <div className="historyorder__time-item">
                            From
                        </div>
                        <div className="historyorder__time-item">
                            To
                        </div>
                        <div className="historyorder__time-item">
                            Order Id:
                        </div>
                        <AiIcons.AiOutlineSearch />
                    </div>
                </div>
                <div className="historyorder__table-header">
                    <table className="historyorder__table">
                        <thead className="historyorder__head">
                            <tr className="historyorder__header">
                                <th>Number</th>
                                <th>Order Id</th>
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
                                {useStatus.map((data, index) => (
                                    <tr className="historyorder__row">
                                        <td>{index + 1}</td>
                                        <td>{data.orderid}</td>
                                        <td>{data.total}</td>
                                        <td>{data.time}</td>
                                        <td>
                                            {data.status}
                                        </td>
                                        <td>
                                            <button
                                                className="historyoder__btn-cancel"
                                                onClick={() => onClickHandle(data.orderid)}
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
