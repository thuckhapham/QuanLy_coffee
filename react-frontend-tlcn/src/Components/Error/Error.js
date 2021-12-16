import React from 'react'
import * as AiIcons from 'react-icons/ai'
import './Error.css'

function Error(props) {
    return (
        <>
            <>
                <div className="error__content">
                    <h2 className="error__content--warn">
                        WARNING
                        <AiIcons.AiFillWarning className="deletemember__content deletemember__content-icon" />
                    </h2>
                    {props.message}
                </div>
                <div className="error__footer">
                    <button className="error__btn error__btn-cancel"
                        onClick={() => props.setError("")}
                    >
                        Close
                    </button>
                </div>
            </>
        </>
    )
}

export default Error
