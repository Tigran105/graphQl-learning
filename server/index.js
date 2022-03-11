const express = require("express")
const fs = require("fs")
const {graphqlHTTP} = require("express-graphql");
const cors = require("cors")
const schema = require("./schema")

const fileName = "./db.json"
let data = fs.readFileSync(fileName);
let users = JSON.parse(data);

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
        users.push(createUser(input))

        fs.writeFile(fileName, JSON.stringify(users), err => {
            if(err) {
                console.log("ERROR")
                throw err;
            }
            console.log("New data added");
        });
        return user
    }
}

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))
app.listen(5000, () => console.log("server has been started on port 5000"))