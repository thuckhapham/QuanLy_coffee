import React, { useState } from "react";
import "./DeleteDrink.css";
import Error from "../../../Error/Error";
import * as AiIcons from "react-icons/ai";
import axios from "axios";

function DeleteDrink(props) {
  const [checkError, setError] = useState("");
  const sendData = (modalState) => {
    props.ModalState(modalState);
  };
  //disable nước
  function deletingDrink(selectedId) {
    props.editedDrink[0].available = false;
    axios({
      method: "put",
      url: "http://localhost:5000/api/products/" + selectedId,
      data: props.editedDrink[0],
      headers: {
        Authorization: `bearer ${props.tokenBearer}`,
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

  // khoi phuc
  function restoneDrink(selectedId) {
    props.editedDrink[0].available = true;
    axios({
      method: "put",
      url: "http://localhost:5000/api/products/" + selectedId,
      data: props.editedDrink[0],
      headers: {
        Authorization: `bearer ${props.tokenBearer}`,
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
        ) : props.editedDrink[0].available ? (
          <>
            <div className="deletedrink__content">
              <h2 className="deletedrink__content--warn">
                WARNING
                <AiIcons.AiFillWarning className="deletedrink__content deletedrink__content-icon" />
              </h2>
              Do you really want to disable {props.editedDrink[0].name}?
            </div>
            <div className="deletedrink__footer">
              <button
                className="deletedrink__btn deletedrink__btn-confirm"
                data-bs-dismiss="modal"
                onClick={() => {
                  deletingDrink(props.editedDrink[0]._id);
                }}
              >
                Confirm
              </button>
              <button
                className="deletedrink__btn deletedrink__btn-cancel"
                onClick={() => sendData(true)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="deletedrink__content">
              <h2 className="deletedrink__content--warn">
                WARNING
                <AiIcons.AiFillWarning className="deletedrink__content deletedrink__content-icon" />
              </h2>
              Do you really want to restone {props.editedDrink[0].name}?
            </div>
            <div className="deletedrink__footer">
              <button
                className="deletedrink__btn deletedrink__btn-confirm"
                onClick={() => {
                  restoneDrink(props.editedDrink[0]._id);
                }}
                data-bs-dismiss="modal"
              >
                Restone
              </button>
              <button
                className="deletedrink__btn deletedrink__btn-cancel"
                onClick={() => sendData(true)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DeleteDrink;
