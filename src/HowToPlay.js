import React from "react";
import { Link } from "react-router-dom";
import "./HowToPlay.css";

function HowToPlay() {
  return (
    <div className="howToPlay">
      <p>
        이것은 숫자 야구게임이고, 방법이 궁금하다면 나무위키를
        참고하세요!(❁´◡`❁)
      </p>
      <p>(숫자는 네자리입니다!)</p>
      <Link to="/play">
        <button>Start</button>
      </Link>
      <Link to="/">
        <button>Back to home</button>
      </Link>
    </div>
  );
}

export default HowToPlay;
