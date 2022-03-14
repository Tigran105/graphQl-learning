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