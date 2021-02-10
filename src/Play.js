import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class Play extends React.Component {
  state = {
    num: 0,
    ans: 0,
    cnt: 0,
    logList: [],
    isFinish: false,
  };

  modify = (n) => {
    this.setState({
      num: n,
    });
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
    let logList = this.state.logList;
    const ans1 = Math.floor(ans / 1000);
    const ans2 = Math.floor((ans % 1000) / 100);
    const ans3 = Math.floor((ans % 100) / 10);
    const ans4 = ans % 10;
    let strike = 0;
    let ball = 0;
    console.log(ans1, ans2, ans3, ans4, ans, numList, num);
    if (num === ans) {
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
      if (strike === 0 && ball === 0) {
        this.setState({ log: "Out" });
      } else {
        const newLog = `${num}: ${strike}strike, ${ball}ball`;
        logList = logList.concat(newLog);
        console.log(newLog);
        //let log = this.state.log.concat("\n", newLog);
        //console.log(log);
        this.setState({ logList: logList });
        this.setState({ cnt: this.state.cnt + 1 });
        //this.updateLog({ newLog });
      }
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
    }
  };

  handleSubmit = () => {
    const { num } = this.state;
    if (num > 1000 && num <= 9999) {
      if (this.isDup(num)) {
        alert("You should choose differnt number");
        this.setState({ num: 0 });
      } else {
        const numList = this.makeNumList(num);
        this.check(numList);
        this.setState({ num: 0 });
      }
    } else {
      alert("Try again!");
    }
  };

  componentDidMount() {
    this.makeAns();
  }
  render() {
    const { num, logList, isFinish, cnt } = this.state;

    return (
      <>
        {isFinish ? (
          <Redirect to={{ pathname: "/result", state: { cnt: cnt } }} />
        ) : (
          <div className="playing">
            <div>{num}</div>
            <input
              type="number"
              placeholder="Try!"
              onChange={(e) => this.modify(parseInt(e.target.value))}
              onKeyPress={(e) => this.handleKeyPress(e)}
            />
            <ul>{this.makeList({ logList })}</ul>
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
