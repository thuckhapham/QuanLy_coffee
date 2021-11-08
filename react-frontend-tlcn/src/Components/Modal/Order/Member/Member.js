import React from 'react'
import './Member.css'
import * as AiIcons from 'react-icons/ai'

function Member(props) {
    // const [useMember, setMember] = useState()
    // const [activeVoucher, setActive] = useState(false)
    const sendData = (modalState) => {
        props.ModalState(modalState)
    }
    return (
        <>
            <div className="member__modal">
                <div className="member__header">
                    Member
                </div>
                <div className="member__modal-info">
                    <form>
                        <label for="membercode">Member Code :</label><br />
                        <input type="text" className="member__input" id="membercode" name="membercode" />
                        <button className="member__icon">
                            <AiIcons.AiOutlineSearch />
                        </button>
                    </form>
                    <label for="membername">Member Name :</label><br />
                    <div className="member__info-name">Tên tự hiện ở đây</div>
                </div>
                <div className="member__modal-button">
                    <button className="member__close" onClick={() => sendData(true)}>
                        Confirm
                    </button>
                </div>
            </div>
        </>
    )
}

export default Member
