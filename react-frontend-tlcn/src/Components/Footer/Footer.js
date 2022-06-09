import React from 'react'
import './Footer.css'
import * as AIcons from "react-icons/ai";

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer__content">
                    <h3>Coffee Order System</h3>
                    <p>@ A project is build by Kha and Minh</p>
                    <ul>
                        <li>
                            <AIcons.AiFillFacebook />
                        </li>
                        <li>
                            <AIcons.AiFillInstagram />
                        </li>
                        <li>
                            <AIcons.AiOutlineMail />
                        </li>
                    </ul>
                </div>
                <div className="footer__bottom">
                    <p>Copyright @2021 by Kha and Minh</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
