import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "../query/user";
import {CREATE_USER} from "../mutation/user";

const CreateUser = () => {
    const {
        refetch
    } = useQuery(GET_ALL_USERS)
    const [newUser] = useMutation(CREATE_USER)
    const [username, setUsername] = useState('')
    const [age, setAge] = useState("")

    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(() => {
            setUsername("")
            setAge("")
            refetch()
        })
    }
    return (
        <form style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"/>
            <input
                value={age}
                onChange={e => setAge(+e.target.value)}
                type="number"/>
            <div className="btns">
                <button style={{float: "right"}}
                        onClick={(e) => addUser(e)}
                >
                    Создать
                </button>
            </div>
        </form>
    );
};

export default CreateUser;