import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import EditProfile from "../../Components/Modal/Profile/EditProfile/EditProfile";
import ChangePassword from "../../Components/Modal/Profile/ChangePassword/ChangePassword";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header2 from "../../NewComponents/Header2/Header";

function Profile(props) {
  const [requestData, setRequestData] = useState(new Date());
  //Set Modal Active
  const [viewModal, setViewModal] = useState(true);
  const [selectedButt, setButt] = useState("");
  //   console.log(selectedButt);
  const callbackModal = (modalState) => {
    setViewModal(modalState);
  };
  //Gửi dữ liệu về trang chính
  const sendData = (modalState) => {
    props.ModalState(modalState);
  };
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");
  const [checkError, setError] = useState("");

  //Data
  const [editedCustomer, setEditedCustomer] = useState([
    { customer_id: 0, customer_name: "loading" },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/users`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response.data);
    });

    axios({
      method: "get",
      url: `http://localhost:5000/api/users/info`,
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setEditedCustomer(response.data);
      })
      .catch(() => navigate("/"));
  }, [requestData]);
  return (
    <>
      <Header2 />
      <div className="container p-3">
        <div className="editprofile__content-header">MY PROFILE</div>
        <div className="editprofile__content-btn">
          <button
            className="editprofile__btn editprofile__btn--add"
            onClick={() => {
              setViewModal(!viewModal);
              setButt("editmember");
            }}
          >
            Edit
          </button>
          <button
            className="editprofile__btn editprofile__btn--cancle"
            onClick={() => {
              setViewModal(!viewModal);
              setButt("changepassword");
            }}
          >
            Change Password
          </button>
        </div>
        <div className="editprofile__content-list">
          <div className="editprofile__content-item">
            <div className="editprofile__lable">MEMBER ID:</div>
            <div className="editprofile__input">
              <input
                type="text"
                className="editprofile__form"
                placeholder="ID"
                value={editedCustomer._id}
                readOnly
              />
            </div>
          </div>
          <div className="newcustomer__content-item">
            <div className="newcustomer__lable">ROLE:</div>
            {/* <div className="newcustomer__input">
                            <select id="category" className="newdrink__select"
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div> */}
            <div className="editprofile__input">
              <input
                type="text"
                className="editprofile__form"
                placeholder="ID"
                value={editedCustomer.role}
                readOnly
              />
            </div>
          </div>
          <div className="editprofile__content-item">
            <div className="editprofile__lable">FIRST NAME:</div>
            <div className="editprofile__input">
              <input
                type="text"
                className="editprofile__form"
                Value={editedCustomer.firstName}
                readOnly
              />
            </div>
          </div>
          <div className="editprofile__content-item">
            <div className="editprofile__lable">LAST NAME:</div>
            <div className="editprofile__input">
              <input
                type="text"
                className="editprofile__form"
                Value={editedCustomer.lastName}
                readOnly
              />
            </div>
          </div>
          <div className="editprofile_idtent-item">
            <div className="editprofile__lable">EMAIL:</div>
            <div className="editprofile__input">
              <input
                type="text"
                className="editprofile__form"
                Value={editedCustomer.email}
                readOnly
              />
            </div>
          </div>
          <div className="editprofile_idtent-item">
            <div className="editprofile__lable">PHONE:</div>
            <div className="editprofile__input">
              <input
                type="text"
                className="editprofile__form"
                Value={editedCustomer.phone}
                readOnly
              />
            </div>
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
            {selectedButt === "editmember" ? (
              <EditProfile
                ModalState={callbackModal}
                editedCustomer={editedCustomer}
                requestData={requestData}
                setRequestData={setRequestData}
              />
            ) : (
              <ChangePassword
                ModalState={callbackModal}
                requestData={requestData}
                setRequestData={setRequestData}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
