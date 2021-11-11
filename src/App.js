import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
