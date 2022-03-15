import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "../query/user";
import Modal from "../common/modal";
import {DELETE_USER, DND_USERS} from "../mutation/user";
import Nestable from "react-nestable";

const Users = () => {
    const {
        data,
        loading,
        refetch
        // error,
    } = useQuery(GET_ALL_USERS)

    const [deleteUser] = useMutation(DELETE_USER)
    const [dndUsers] = useMutation(DND_USERS)
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
    const deleteFnc = (e, id) => {
        e.stopPropagation()
        e.preventDefault()
        deleteUser({
            variables: {
                input: {
                    id
                }
            }
        }).then(() => {
            refetch()
        })
    }
    const dragAndDropFnc = (array) => {
        dndUsers({
            variables: {
                input: JSON.stringify(array)
            }
        }).then(() => {
            refetch()
        })

    }
    return (
        <div>
            {openModal && <Modal user={openModal} setOpen={setOpenModal} refetch={refetch}/>}
            <Nestable
                items={users}
                maxDepth={0}
                collapsed={false}
                onChange={e => {
                    e.items.map((elem, i) => {
                        delete elem.children
                        // elem.order = i + 1
                        return e.items
                    })
                    dragAndDropFnc(e.items)

                }}
                renderItem={items => {
                    const {item} = items;
                    return (
                        <div key={`${item.id}${item.age}`}
                             className="user"
                             onDoubleClick={() => setOpenModal(item)}
                        >
                            {item.id}. {item.username} --- {item.age}
                            <i style={{color: "red", fontSize: '25px', marginLeft: "20px"}}
                               className="bi bi-trash-fill"
                               onClick={e => deleteFnc(e, item.id)}
                            />
                        </div>
                    );
                }}
            />
            {/*{users.map(user =>*/}
            {/*    <div key={user.id}*/}
            {/*         className="user"*/}
            {/*         onDoubleClick={() => setOpenModal(user)}*/}
            {/*    >*/}
            {/*        {user.id}. {user.username} --- {user.age}*/}
            {/*        <i style={{color: "red", fontSize: '25px', marginLeft: "20px"}}*/}
            {/*           className="bi bi-trash-fill"*/}
            {/*           onClick={e => deleteFnc(e, user.id)}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default Users;