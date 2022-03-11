const express = require("express")
const {graphqlHTTP} = require("express-graphql");
const cors = require("cors")
const schema = require("./schema")
const users = [
    {id:1, username:"hrach", age:25},
    {id:2, username:"murad", age:45},
    {id:3, username:"anton", age:18},
    {id:4, username:"vlad", age:32},
]
//
const app = express()
app.use(cors())

const createUser = (input) => {
    const id = Math.max(...users.map(e => +e.id)) + 1
    return {
        id,
        ...input
    }
}

const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => +user.id === +id)
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user)
        return user
    }
}

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))
app.listen(5000, () => console.log("server has been started on port 5000"))