import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AiIcon from "react-icons/ai";
import "./Login.css";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import Header2 from "../../NewComponents/Header2/Header";
import Footer from "../Footer/Footer";

function Login(props) {

  //Login
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  const [selectedUsername, setUsername] = useState("");
  const [selectedPassword, setPassword] = useState("");
  const [checkError, setError] = useState("");
  const navigate = useNavigate();
  function Login(selectedUsername, selectedPassword) {
    axios({
      method: "post",
      url: "http://localhost:5000/auth/signin",
      data: {
        userName: selectedUsername,
        password: selectedPassword,
      },
    })
      .then((response) => {
        navigate("/home");
        localStorage.setItem("tokenBearer", response.data.token);
        localStorage.setItem("coffeeRole", response.data.role);
        console.log(response.data);
        // localStorage.setItem("usernameId",response.data.)
      })
      .catch(function (error) {
        if (error.response) {
          setError("Error");
        }
      });
  }

  return (
    <>
      <Header2 />
      <div className="container p-3">
        {/* <div className={values.redirectToReferrer ? "modal--unactive" : "modal"}> */}
        <div className="row">
          <div className="col-12 col-sm-6 mx-auto d-block">
            <img
              src="https://www.pngall.com/wp-content/uploads/4/Cafe-Transparent.png"
              alt="logo"
              className="w-100"
            />
          </div>
          <div className="col-12 col-sm-6 auth-form mx-auto d-block">
            <div className="auth-form__container">
              <div className="text-center">
                <h3>Login</h3>
              </div>
              <div className="auth-form__form">
                <div className="auth-form__group">
                  <input
                    id="userName"
                    type="string"
                    className="auth-form__input"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Your username"
                  />
                  <input
                    id="password"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="auth-form__input"
                    placeholder="Your password"
                  />
                </div>
              </div>

              <div className="mt-3">
                {/* <button className="btn btn--normal auth-form__controls-back">TRỞ LẠI</button> */}
                <button
                  className="auth-form__btn auth-form__btn--login d-block mx-auto"
                  onClick={() => {
                    Login(selectedUsername, selectedPassword);
                  }}
                >
                  Login
                </button>
                {/* </Link> */}
              </div>
            </div>
            admin1
            <br />
            admin123456
            <br />
            <br />
            nv420
            <br />
            123123
            <br />
            {checkError === "Error" && (
              <>
                <div className="error__content">
                  <h2 className="error__content--warn">
                    WARNING
                    <AiIcons.AiFillWarning className="deletemember__content deletemember__content-icon" />
                  </h2>
                  Username or Password is not matched!!
                </div>
                {/* <div className="error__footer">
                  <button
                    className="error__btn error__btn-cancel"
                    onClick={() => setError("")}
                  >
                    Close
                  </button>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
