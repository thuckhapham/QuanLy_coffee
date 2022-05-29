import React, { useState } from "react";
import axios from "axios";
import Error from "../../../Error/Error";
import "./EditProfile.css";

function EditProfile(props) {
  const [checkError, setError] = useState("");
  //Gửi dữ liệu về trang chính
  const sendData = (modalState) => {
    props.ModalState(modalState);
  };
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");

  const [selectedRole, setRole] = useState(props.editedCustomer.role);
  const [selectedFirstName, setFirstName] = useState(
    props.editedCustomer.firstName
  );
  const [selectedLastName, setLastName] = useState(
    props.editedCustomer.lastName
  );
  const [selectedEmail, setEmail] = useState(props.editedCustomer.email);
  const [selectedPhone, setPhone] = useState("");

  const [viewList, setList] = useState([{ phone: 0, name: "", email: "" }]);

  //Sửa thông tin
  function editProfile() {
    axios({
      method: "put",
      url: `http://localhost:5000/api/users/info`,
      data: {
        firstName: selectedFirstName,
        lastName: selectedLastName,
        email: selectedEmail,
        phone: selectedPhone,
      },
      headers: {
        Authorization: `bearer ${tokenBearer}`,
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        props.setRequestData(new Date());
        sendData(true);
      })
      .catch(function (error) {
        if (error.response) {
          setError("Error");
        }
      });
  }
  return (
    <>
      <div className="p-2">
        {checkError === "Error" ? (
          <>
            <Error
              message="Please check the information again!"
              setError={setError}
            />
          </>
        ) : (
          <>
            <div className="editcustomer__content-list">
              <div className="editcustomer__content-item">
                <div className="editcustomer__lable">PROFILE ID:</div>
                <div className="editcustomer__input">
                  <input
                    type="text"
                    className="editcustomer__form"
                    placeholder="ID"
                    value={props.editedCustomer._id}
                    disabled
                  />
                </div>
              </div>
              <div className="editcustomer__content-item">
                <div className="editcustomer__lable">FIRST NAME:</div>
                <div className="editcustomer__input">
                  <input
                    type="text"
                    className="editcustomer__form"
                    Value={props.editedCustomer.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="editcustomer__content-item">
                <div className="editcustomer__lable">LAST NAME:</div>
                <div className="editcustomer__input">
                  <input
                    type="text"
                    className="editcustomer__form"
                    Value={props.editedCustomer.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="editcustomer_idtent-item">
                <div className="editcustomer__lable">EMAIL:</div>
                <div className="editcustomer__input">
                  <input
                    type="text"
                    className="editcustomer__form"
                    Value={props.editedCustomer.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="editcustomer_idtent-item">
                <div className="editcustomer__lable">PHONE:</div>
                <div className="editcustomer__input">
                  <input
                    type="text"
                    className="editcustomer__form"
                    Value={props.editedCustomer.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="text-center p-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  editProfile();
                }}
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default EditProfile;
