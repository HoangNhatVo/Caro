import React from 'react';
import './App.css';
import Board from './Board';
const minSize = 5;
const maxSize = 25;
const nSquareToWin = 5;

class Game extends React.Component {
  constructor(props) {
    super(props);
    let tmpArr = Array(20);
    for (let i = 0; i < 20; i++) {
      tmpArr[i] = Array(20).fill(null);
    }
    this.state = {
      inputWidth: 20,
      inputHeight: 20,
      width: 20,
      height: 20,
      history: [{
        squares: tmpArr,
        location: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      isDescending: true,
    };
    this.handleChangeHeight = this.handleChangeHeight.bind(this);
    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.sort = this.sort.bind(this);
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    })
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: {x: i, y: j}
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  sort() {
    this.setState({isDescending: !this.state.isDescending});
  }
  handleChangeWidth(e) {
    const val = Number(e.target.value);
    this.setState({inputWidth: val});
    if (val >= minSize && val <= maxSize) {
      let tmpArr = Array(this.state.height);
      for (let i = 0; i < this.state.height; i++) {
        tmpArr[i] = Array(val).fill(null);
      }
      this.setState({
        width: val,
        history: [{
          squares: tmpArr,
          location: null,
        }],
        stepNumber: 0,
        xIsNext: true,
      });
    }
  }
  handleChangeHeight(e) {
    const val = Number(e.target.value);
    this.setState({inputHeight: val});
    if (val >= minSize && val <= maxSize) {
      let tmpArr = Array(val);
      for (let i = 0; i < val; i++) {
        tmpArr[i] = Array(this.state.width).fill(null);
      }
      this.setState({
        height: Number(val),
        history: [{
          squares: tmpArr,
          location: null,
        }],
        stepNumber: 0,
        xIsNext: true,
      });
    }
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' (' + step.location.x + ',' + step.location.y + ')' :
        'Go to game start';
      return (this.state.stepNumber === move) ? (
        <li key={move}>
          <button className="btn-bold" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      ) : (
        <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
      );
    });
    if (!this.state.isDescending) {
      moves = moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner.val;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="content">
        <div className="game">
        <div className="game-info">
        <h1>Game caro Việt Nam</h1>
            <div style={{fontSize:20,marginTop:20}}>{status}</div>
            <ol>{moves}</ol>
          </div>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i, j) => this.handleClick(i, j)}
              winner={winner}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game
// ========================================

function calculateWinner(squares) {
  let win;
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      //Kiểm trang NSquareToWin ô liên tiếp từ ô xuất phát sang phải, xuống góc phải dưới, xuống góc trái dưới
      //Nếu có NSquareToWin - 1 cặp liên tiếp giống nhau thì thắng
      //Direction: ToRight, ToRightDown, ToDown, ToLeftDown
      if (!squares[i][j]) continue;
      if (j <= squares[i].length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToRight'};
      }
      if (i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToDown'};
      }
      if (j <= squares[i].length - nSquareToWin && i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToRightDown'};
      }
      if (i <= squares.length - nSquareToWin && j >= nSquareToWin - 1) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToLeftDown'};
      }
    }
  }
  return null;
}
