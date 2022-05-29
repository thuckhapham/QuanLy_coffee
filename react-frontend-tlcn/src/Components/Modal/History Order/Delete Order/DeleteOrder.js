import React, { useState } from "react";
import "./DeleteOrder.css";
import Error from "../../../Error/Error";
import * as AiIcons from "react-icons/ai";
import axios from "axios";

function DeleteDrink(props) {
  const [checkError, setError] = useState("");
  //Lấy Bearer Token
  const tokenBearer = localStorage.getItem("tokenBearer");

  const sendData = (modalState) => {
    props.ModalState(modalState);
  };
  //Thêm nước
  function cancelOrder() {
    axios({
      method: "delete",
      url: `http://localhost:5000/api/order/${props.orderId}`,
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
      <div className="deletedrink">
        {checkError === "Error" ? (
          <Error message="You dont' have the authority!" setError={setError} />
        ) : (
          <>
            <div className="deletedrink__content">
              <h2 className="deletedrink__content--warn">
                WARNING
                <AiIcons.AiFillWarning className="deletedrink__content deletedrink__content-icon" />
              </h2>
              Do you really want to cancel ? <br /> ({props.orderId})
            </div>
            <div className="p-3 ">
              <button
                className="deletedrink__btn deletedrink__btn-confirm"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  cancelOrder();
                }}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DeleteDrink;
