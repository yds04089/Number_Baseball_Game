import React from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import "./Play.css";
import Swal from "sweetalert2";

class Play extends React.Component {
  state = {
    num: 0,
    ans: 0,
    cnt: 0,
    logList: [],
    isFinish: false,
    gameOver: false,
  };

  sweetalert = (title, contents, icon, confirmButtonText) => {
    Swal.fire({
      title: title,
      text: contents,
      icon: icon,
      confirmButtonText: confirmButtonText,
    });
  };

  modify = (n) => {
    this.setState({
      num: n,
    });
    console.log("n: ", n);
  };

  makeNumList = (num) => {
    const num1 = Math.floor(num / 1000);
    const num2 = Math.floor((num % 1000) / 100);
    const num3 = Math.floor((num % 100) / 10);
    const num4 = num % 10;
    return [num1, num2, num3, num4];
  };

  isDup = (num) => {
    const num1 = Math.floor(num / 1000);
    const num2 = Math.floor((num % 1000) / 100);
    const num3 = Math.floor((num % 100) / 10);
    const num4 = num % 10;
    if (
      num1 === num2 ||
      num2 === num3 ||
      num3 === num4 ||
      num4 === num1 ||
      num1 === num3 ||
      num2 === num4
    ) {
      return true;
    } else {
      return false;
    }
  };

  makeAns = () => {
    const max = 10000;
    const min = 1000;
    while (true) {
      const num = Math.floor(Math.random() * (max - min) + min);
      console.log(num);
      if (!this.isDup(num)) {
        console.log("ans: ", num);
        this.setState({ ans: num });
        break;
      }
    }
  };

  //답이 맞는지 체크함
  check = (numList) => {
    const num = this.state.num;
    const ans = this.state.ans;
    const cnt = this.state.cnt;
    let logList = this.state.logList;
    const ans1 = Math.floor(ans / 1000);
    const ans2 = Math.floor((ans % 1000) / 100);
    const ans3 = Math.floor((ans % 100) / 10);
    const ans4 = ans % 10;
    let strike = 0;
    let ball = 0;
    console.log(ans1, ans2, ans3, ans4, ans, numList, num);
    if (cnt === 9) {
      this.setState({ gameOver: true });
      this.setState({ isFinish: true });
    } else if (num === ans) {
      logList = logList.concat(
        `Conratulation!🎉 Your Count: ${this.state.cnt}`
      );
      console.log(logList);
      this.setState({ logList });
      this.setState({ isFinish: true });
    } else {
      if (numList.includes(ans1)) {
        console.log("1", ans1, numList[0]);
        if (ans1 === numList[0]) {
          strike += 1;
        } else {
          ball += 1;
        }
      }
      if (numList.includes(ans2)) {
        console.log("2", ans2, numList[1]);
        if (ans2 === numList[1]) {
          strike += 1;
        } else {
          ball += 1;
        }
      }
      if (numList.includes(ans3)) {
        console.log("3", ans3, numList[2]);
        if (ans3 === numList[2]) {
          strike += 1;
        } else {
          ball += 1;
        }
      }
      if (numList.includes(ans4)) {
        console.log("4", ans4, numList[3]);
        if (ans4 === numList[3]) {
          strike += 1;
        } else {
          ball += 1;
        }
      }
      const newLog =
        strike === 0 && ball === 0
          ? `${num} → out`
          : `${num} → ${strike} strike, ${ball} ball`;
      logList = logList.concat(newLog);
      console.log(newLog);
      this.setState({ logList: logList });
      this.setState({ cnt: this.state.cnt + 1 });
    }
  };

  makeList = ({ logList }) => {
    return logList.map((log, idx) => (
      <li key={idx} className="log">
        {log}
      </li>
    ));
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSubmit();
      e.target.value = "";
    }
  };

  handleSubmit = () => {
    const { num } = this.state;
    if (num > 1000 && num <= 9999) {
      if (this.isDup(num)) {
        this.sweetalert(
          "Wrong Input",
          "서로 다른 숫자로 된 네자리 수를 입력해주세요!",
          "warning",
          "닫기"
        );
        this.setState({ num: 0 });
      } else {
        const numList = this.makeNumList(num);
        this.check(numList);
        this.setState({ num: 0 });
      }
    } else {
      this.sweetalert(
        "Wrong Input",
        "1000~9999 사이의 수를 입력하세요!",
        "warning",
        "닫기"
      );
    }
  };
  showAns = (ans) => {
    this.sweetalert(`answer: ${ans}`, "", "info", "확인");
  };

  componentDidMount() {
    this.makeAns();
  }
  render() {
    const { logList, isFinish, cnt, gameOver } = this.state;

    return (
      <>
        {isFinish ? (
          <Redirect
            to={{
              pathname: "/result",
              state: { cnt: cnt, gameOver: gameOver },
            }}
          />
        ) : (
          <div className="playing">
            <div className="nowCnt">left chances: {10 - cnt}</div>
            <input
              type="number"
              placeholder="Try!"
              onChange={(e) => this.modify(parseInt(e.target.value))}
              onKeyPress={(e) => this.handleKeyPress(e)}
            />
            <ul>{this.makeList({ logList })}</ul>
            <div className="buttons">
              <button
                onClick={() => {
                  const ans = this.state.ans;
                  this.showAns(ans);
                  this.props.history.push("/result");
                }}
              >
                Give up
              </button>
              <button onClick={() => window.location.reload()}>Restart</button>
            </div>
          </div>
        )}
      </>
    );
  }
}

Play.propTypes = {
  num: PropTypes.number.isRequired,
};

export default Play;
