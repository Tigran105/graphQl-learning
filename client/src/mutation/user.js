import {gql} from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser($input:UserInput){
            createUser(input: $input) {
                id, username, age
            }
    }
`
export const EDIT_USER = gql`
    mutation editUser($input:UserInput){
            editUser(input: $input) {
                id, username, age
            }
    }
`
export const DELETE_USER = gql`
    mutation delete($input:DeleteInput){
            deleteUser(input: $input) {
                id
            }
    }
`
export const DND_USERS = gql`
    mutation dndUsers($input:[UserInput]){
            dndUsers(input: $input) {
                users
            }
    }
`