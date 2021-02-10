import React from "react";
import { Link } from "react-router-dom";

function HowToPlay() {
  return (
    <>
      <p className="howToPlay">
        이것은 숫자 야구게임이고, 방법이 궁금하다면 나무위키를
        참고하세요!(❁´◡`❁)
      </p>
      <Link to="/play">
        <button>Start</button>
      </Link>
      <Link to="/">
        <button>Back to home</button>
      </Link>
    </>
  );
}

export default HowToPlay;
