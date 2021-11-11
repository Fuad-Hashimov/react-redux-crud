import { Route, Switch } from "react-router-dom";
import "./App.css";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/addUser" component={AddUser} />
        <Route  path="/editUser/:id" component={EditUser} />
      </Switch>
    </div>
  );
}

export default App;
