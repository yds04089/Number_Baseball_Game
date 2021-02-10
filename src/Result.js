import React from "react";
import { Link } from "react-router-dom";

function Result(props) {
  console.log(props);
  const cnt = props.location.state.cnt;
  return (
    <div className="result">
      <h1>Conratulation!🎉</h1>
      <h4>Your Count: {cnt}</h4>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/play">
        <button>↻Restart</button>
      </Link>
    </div>
  );
}

export default Result;
