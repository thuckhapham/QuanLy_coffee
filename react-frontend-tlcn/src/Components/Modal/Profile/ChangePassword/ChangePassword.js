import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../../../Error/Error";
import "./ChangePassword.css";

function ChangePassword(props) {
  const [checkError, setError] = useState("");
  //Gửi dữ liệu về trang chính
  const sendData = (modalState) => {
    props.ModalState(modalState);
  };
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");

  const [selectedOldPassword, setOldPassword] = useState("");
  const [selectedPassword, setPassword] = useState("");
  //Sửa mật khẩu
  const navigate = useNavigate();
  function editPassword() {
    axios({
      method: "post",
      url: `http://localhost:5000/api/users/info/changepwd`,
      data: {
        oldPassword: selectedOldPassword,
        password: selectedPassword,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        props.setRequestData(new Date());
        sendData(true);
        if (localStorage.getItem("tokenBearer")) {
          localStorage.removeItem("tokenBearer");
          alert("Change password successfully!");
          navigate("/");
        }
      })
      .catch(function (error) {
        if (error.response) {
          setError("Error");
        }
      });
  }
  return (
    <>
      <div className="editcustomer__content">
        {checkError === "Error" ? (
          <>
            <Error
              message="Please check the old password again!"
              setError={setError}
            />
          </>
        ) : (
          <>
            <div className="editcustomer__content-list">
              <div className="editcustomer__content-item">
                <div className="editcustomer__lable">OLD PASSWORD:</div>
                <div className="editcustomer__input">
                  <input
                    type="password"
                    className="editcustomer__form"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="editcustomer__content-item">
                <div className="editcustomer__lable">NEW PASSWORD:</div>
                <div className="editcustomer__input">
                  <input
                    type="password"
                    className="editcustomer__form"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="text-center p-2">
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  editPassword();
                }}
              >
                Change
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ChangePassword;
