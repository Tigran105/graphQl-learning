import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {EDIT_USER} from "../mutation/user";

const Modal = ({user, setOpen, refetch}) => {
    const [editUser] = useMutation(EDIT_USER)

    const [usernameValue, setUsernameValue] = useState(user.username)
    const [ageValue, setAgeValue] = useState(user.age)
    const changeUser = (e) => {
        e.preventDefault()
        setOpen(false)
        editUser({
            variables: {
                input: {
                    id: user.id,
                    username: usernameValue,
                    age: ageValue
                }
            }
        }).then(() => {
            refetch()
        })
    }
    return (
        <div style={{
            position: "fixed",
            top: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
             onClick={() => setOpen(false)}
        >
            <form style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "white",
                padding:"100px"
            }}
                  onClick={e => e.stopPropagation()}
            >
                <input
                    value={usernameValue}
                    onChange={e => setUsernameValue(e.target.value)}
                    type="text"/>
                <input
                    value={ageValue}
                    onChange={e => setAgeValue(+e.target.value)}
                    type="number"/>
                <div className="btns">
                    <button style={{float: "right"}}
                            onClick={(e) => changeUser(e, usernameValue, ageValue, user.id)}
                    >
                        Создать
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Modal;