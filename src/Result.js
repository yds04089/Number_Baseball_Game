import React from "react";
import { Link } from "react-router-dom";
import "./Result.css";

function Result(props) {
  console.log(props);
  let isCnt = false;
  if (props.location.state) {
    isCnt = true;
  } else {
    return (
      <div className="result">
        <h1>화이팅!</h1>
        <h4>다음엔 스스로 맞춰보세요!😊</h4>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/play">
          <button>↻Restart</button>
        </Link>
      </div>
    );
  }
  const cnt = props.location.state.cnt;
  const gameOver = props.location.state.gameOver;
  if (gameOver) {
    return (
      <div className="result">
        <h1>You Lose😂</h1>
        <h4>10번 이내에 성공해야해요!</h4>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/play">
          <button>↻Restart</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="result">
      <h1>Conratulation!🎉</h1>
      <h4>Your Count: {cnt + 1}</h4>
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
