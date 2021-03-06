const {buildSchema} = require("graphql");

const schema = buildSchema(`

    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }
    
    type Post {
        id:ID
        title: String
        content: String
    }
    
    type DndUsers {
        users: [User] 
    }
    
    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    } 
    
    input PostInput {
        id:ID
        title: String!
        content: String!     
    }
    
     input DeleteInput {
        id:ID
     }
    
    type Query {
        getAllUsers: [User]
        getUser(id:ID): User
    }
    
    type Mutation {
        createUser(input: UserInput): User 
        editUser(input: UserInput): User
        deleteUser(input: DeleteInput): User
        dndUsers(input: String): DndUsers
    }
    
`)
module.exports = schema