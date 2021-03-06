import React from "react";
import Play from "./Play";
import { HashRouter, Link } from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="home">
          <h1>Number Baseball Game⚾</h1>
          <div className="buttons">
            <Link to="/play">
              <button>Start</button>
            </Link>
            <Link to="/how-to-play">
              <button>How to play</button>
            </Link>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Home;
