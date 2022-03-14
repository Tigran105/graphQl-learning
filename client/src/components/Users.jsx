import React, {useEffect, useState} from 'react';
import { useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "../query/user";
import Modal from "../common/modal";

const Users = () => {
    const {
        data,
        loading,
        refetch
        // error,
    } = useQuery(GET_ALL_USERS)

    const [users, setUsers] = useState([])
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        if (!loading) {
            setUsers([...data.getAllUsers])
        }
    }, [data])
    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", cursor: "pointer"}}>
            {openModal && <Modal user={openModal} setOpen={setOpenModal} refetch={refetch}/>}

            {users.map(user =>
                <div key={user.id}
                     className="user"
                     style={{padding: "10px 50px", margin: "5px 10px"}}
                     onDoubleClick={() => setOpenModal(user)}
                >
                    {user.id}. {user.username} {user.age}
                </div>
            )}
        </div>
    );
};

export default Users;