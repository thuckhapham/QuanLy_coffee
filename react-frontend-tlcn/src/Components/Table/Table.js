import React from 'react'
import './Table.css'

function Table() {
    return (
        <>
            <table className="table">
                <thead className="table__head">
                    <tr className="table__header">
                        <th>Order</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Birth Date</th>
                        <th>Email</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    <tr className="table__row">
                        <td>Alfreds </td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        <td>Thong nhat</td>
                        <td>asdfsd</td>
                        <td className="table__row-btn">
                            <button className="table__btn-item table__btn-item--edit">
                                Edit
                            </button>
                            <button className="table__btn-item table__btn-item--delete table__btn-item--seperate">
                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr className="table__row table__row--active">
                        <td>Centro </td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                        <td>Thong nhat</td>
                        <td>asdfsd</td>
                        <td className="table__row-btn">
                            <button className="table__btn-item table__btn-item--edit">
                                Edit
                            </button>
                            <button className="table__btn-item table__btn-item--delete table__btn-item--seperate">
                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr className="table__row">
                        <td>Centro </td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                        <td>Thong nhat</td>
                        <td>asdfsd</td>
                        <td className="table__row-btn">
                            <button className="table__btn-item table__btn-item--edit">
                                Edit
                            </button>
                            <button className="table__btn-item table__btn-item--delete table__btn-item--seperate">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Table
