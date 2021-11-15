import React, { useEffect, useState } from 'react'
import './Homepage.css'
import { Link } from 'react-router-dom'
import Login from '../../Components/Login/Login'
import {createTable, getTables} from './api-homepage'
import auth from './../../Components/Login/auth-helper'
function Homepage() {
    //Data
    const [datas, setDatas] = useState([])
    useEffect( () =>{
        const abortController = new AbortController()
        const signal = abortController.signal
        getTables(1,10,signal).then((data) =>{
            if(data && data.error){
                console.log(data.error)
            }
            else{

                setDatas(data.tables)
            }
        })
        return function cleanup(){
            abortController.abort()
          }
    },[])

    const [values, setValues] = useState({
        tablePoin: '',
        error: ''
    })
    const jwt = auth.isAuthenticated()
    
    const addTableSubmit = ()=> {
        const table = {
            tablePoin: values.tablePoin || undefined
        }
        createTable({type : jwt.token_type, token: jwt.token},table).then((data) =>{
            console.log(data)
            if(data.error){
                setValues({ ...values, error: data.error})
            }
            else{
                datas.push(data)
            }
        })
    }
    const handleChange = name => event => {
    
        setValues({...values, [name]: event.target.value})

      }
    // const datas = [
    //     {
    //         tablePoin: "POIN1",
    //         tableSource: "Table"
    //     },
    //     {
    //         tablePoin: "POIN2",
    //         tableSource: "Table"
    //     },
    //     {
    //         tablePoin: "POIN3",
    //         tableSource: "Table"
    //     },
    //     {
    //         tablePoin: "POIN4",
    //         tableSource: "Table"
    //     },
    //     {
    //         tablePoin: "POIN5",
    //         tableSource: "Table"
    //     },
    // ]
    //Set Modal Active
    const [viewModal, setViewModal] = useState(true);
    // const callbackModal = (modalState) => {
    //     setViewModal(modalState);
    // };
    return (
        <>
            {/* <Login /> */}
            <div className="homepage">
                <div className="homepage__header-list">
                    {/* <div className="homepage__header-item homepage__header-item--title">
                        HOMEPAGE
                    </div> */}
                    <div className="homepage__header-item homepage__header-btn">
                        <button
                            className="homepage__btn-add"
                            onClick={() => setViewModal(!viewModal)}
                        >
                            + CREATE TABLE
                        </button>
                    </div>
                </div>
                <div className="homepage__contain">
                    {datas.map(data => (
                        <Link key={data.tablePoin} className="homepage__order-link" to={"/order/" + data.tablePoin} >
                            {data.tablePoin}
                        </Link>
                    ))}
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
                    <div className="newtable__content">
                        <div className="newtable__content-header">
                            CREATING NEW TABLE
                        </div>
                        <div className="newtable__content-list">
                            <div className="newtable__content-item">
                                <div className="newtable__lable">
                                    TABLE ORDER:
                                </div>
                                <div className="newtable__input">
                                    <input 
                                    id="tablePoint" 
                                    value={values.tablePoin} 
                                    onChange={handleChange('tablePoin')} 
                                    type="string" 
                                    className="newtable__form"
                                    placeholder="TablePoint" />
                                </div>
                                <br/> {
                                    values.error 
                                }
                            </div>
                            <div className="newtable__content-item">
                                <div className="newtable__lable">
                                    TABLE SOURCE:
                                </div>
                                <div className="newtable__input">
                                    <input type="text" className="newtable__form" placeholder="Source" />
                                </div>
                            </div>
                        </div>
                        <div className="newtable__content-btn">
                            <button
                                className="newtable__btn newtable__btn--add"
                                onClick={addTableSubmit}
                            >
                                Add
                            </button>
                            <button
                                className="newtable__btn newtable__btn--cancle"
                                onClick={() => setViewModal(!viewModal)}
                            >
                                Cancle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div>  */}
        </>
    )
}

export default Homepage
