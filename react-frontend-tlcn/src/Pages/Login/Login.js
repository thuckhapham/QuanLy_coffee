import React from 'react'
import * as AiIcon from 'react-icons/ai'
import './Login.css'
function Login() {
    return (
        <>
            {/* <div className={viewModal ? "modal--unactive" : "modal"}> */}
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
                                    <input type="text" class="auth-form__input" placeholder="Your email" />
                                    <input type="password" class="auth-form__input" placeholder="Your password" />
                                </div>
                            </div>
                            <div class="auth-form__controls">
                                {/* <button class="btn btn--normal auth-form__controls-back">TRỞ LẠI</button> */}
                                <button class="auth-form__btn auth-form__btn--login">Login</button>
                            </div>
                        </div>
                        <div class="auth-form__social">
                            <a href="" class="auth-form__social--facbebook btn btn--size-s btn--with-icon">
                                <AiIcon.AiFillFacebook class="auth-form__social-icon fab fa-facebook-square" />
                                <span class="auth-form__socials-title">
                                    Login with Facebook
                                </span>
                            </a>
                            <a href="" class="auth-form__social--google btn btn--size-s btn--with-icon">
                                <AiIcon.AiFillGoogleCircle class="auth-form__social-icon fab fa-google" />
                                <span class="auth-form__socials-title">
                                    Login with Google
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
