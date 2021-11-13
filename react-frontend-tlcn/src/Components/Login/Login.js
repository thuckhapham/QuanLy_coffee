import React, { useState } from "react";
import * as AiIcon from "react-icons/ai";
import "./Login.css";
import {signin} from './api-auth.js'
import auth from './auth-helper'
function Login() {
    //Set Modal Active
    const [values, setValues] = useState({
        userName: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })
  
    const clickSubmit = ()=> {
        const user = {
            userName: values.userName || undefined,
            password: values.password || undefined
        }
        signin(user).then((data) =>{
            console.log(data)
            if(data.error){
                setValues({ ...values, error: data.error})
            }
            else{
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '',redirectToReferrer: true})
                })
            }
        })
    }
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    return (
        <>
            <div className={values.redirectToReferrer ? "modal--unactive" : "modal"}>
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
                                        value={values.userName}
                                        class="auth-form__input"
                                        onChange={handleChange('userName')}
                                        placeholder="Your userName"
                                    />
                                    <input
                                        id="password"
                                        type="password"
                                        value={values.password} 
                                        onChange={handleChange('password')}
                                        class="auth-form__input"
                                        placeholder="Your password"
                                    />
                                </div>
                            </div>
                            <br/> {
                                    values.error 
                            }
                            <div class="auth-form__controls">
                                {/* <button class="btn btn--normal auth-form__controls-back">TRỞ LẠI</button> */}
                                <button
                                    class="auth-form__btn auth-form__btn--login"
                                    onClick={clickSubmit}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                        <div class="auth-form__social">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
