import './App.css';
import {useQuery} from "@apollo/client";
import {GET_ONE_USERS} from "./query/user";
import CreateUser from "./components/CreateUser";
import Users from "./components/Users";
function App() {
    const {
        data: oneUser,
    } = useQuery(GET_ONE_USERS, {
        variables: {
            id: 2
        }
    })
    console.log(oneUser, "+++++++++++++++++++++++++++++");

    return (
<>
        <h3 style={{position: "absolute", left: "50px"}}>for change double click in user</h3>
    <div style={{maxWidth: "70vw", position: "relative"}}>
        <CreateUser/>
        <Users/>
    </div>
</>
    );
}

export default App;
