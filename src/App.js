import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Play from "./Play";
import HowToPlay from "./HowToPlay";
import Result from "./Result";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/play" component={Play} />
      <Route path="/how-to-play" component={HowToPlay} />
      <Route path="/result" component={Result} />
    </HashRouter>
  );
}

export default App;
