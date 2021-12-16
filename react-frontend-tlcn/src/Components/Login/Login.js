import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import * as AiIcon from "react-icons/ai";
import "./Login.css";
import axios from 'axios'

function Login(props) {
    //Set Modal Active
    const sendData = (modalState) => {
        props.ModalState(modalState);
    }
    //Login
    const [selectedUsername, setUsername] = useState("")
    const [selectedPassword, setPassword] = useState("")
    const navigate = useNavigate();
    function Login(selectedUsername, selectedPassword) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/signin',
            data: {
                userName: selectedUsername,
                password: selectedPassword
            }
        }).then((response) => {
            if (response.data.token) {
                navigate('/homepage')
                localStorage.setItem("tokenBearer", response.data.token);
            } else {
                console.log("Error")
            }
        })
    }
    return (
        <>
            {/* <div className={values.redirectToReferrer ? "modal--unactive" : "modal"}> */}
            <div className="modal">
                <div className="modal__overlay"></div>
                <div className="modal__body">
                    <div class="auth-form">
                        <div class="auth-form__container">
                            <div class="auth-form__header">
                                <h3 class="auth-form__heading">Login</h3>
                                {/* <button class="auth-form__switch-btn">Đăng kí</button> */}
                            </div>
                            <div class="auth-form__form">
                                <div class="auth-form__group">
                                    <input
                                        id="userName"
                                        type="string"
                                        class="auth-form__input"
                                        onChange={e => {
                                            setUsername(e.target.value)
                                        }}
                                        placeholder="Your userName"
                                    />
                                    <input
                                        id="password"
                                        type="password"
                                        onChange={e => {
                                            setPassword(e.target.value)
                                        }}
                                        class="auth-form__input"
                                        placeholder="Your password"
                                    />
                                </div>
                            </div>
                            <br /> {
                                // values.error
                            }
                            <div class="auth-form__controls">
                                {/* <button class="btn btn--normal auth-form__controls-back">TRỞ LẠI</button> */}
                                {/* <Link to={{
                                    pathname: '/homepage',
                                    state: {
                                        tokenBearer: selectedKey
                                    }
                                }}> */}
                                <button
                                    class="auth-form__btn auth-form__btn--login"
                                    onClick={() => {
                                        Login(selectedUsername, selectedPassword)
                                    }}
                                >
                                    Login
                                </button>
                                {/* </Link> */}
                            </div>
                        </div>
                        <br />
                        {/* <div class="auth-form__social">
                            <a
                                href=""
                                class="auth-form__social--facbebook btn btn--size-s btn--with-icon"
                            >
                                <AiIcon.AiFillFacebook class="auth-form__social-icon fab fa-facebook-square" />
                                <span class="auth-form__socials-title">
                                    Login with Facebook
                                </span>
                            </a>
                            <a
                                href=""
                                class="auth-form__social--google btn btn--size-s btn--with-icon"
                            >
                                <AiIcon.AiFillGoogleCircle class="auth-form__social-icon fab fa-google" />
                                <span class="auth-form__socials-title">Login with Google</span>
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
