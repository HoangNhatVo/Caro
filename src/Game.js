import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Board from './components/Board';
import * as action from './actions/index';

const nSquareToWin = 5;
function calculateWinner(squares) {
  let win;
  for (let i = 0; i < squares.length; i += 1) {
    for (let j = 0; j < squares[i].length; j += 1) {
      // Kiểm trang NSquareToWin ô liên tiếp từ ô xuất phát sang phải, xuống góc phải dưới, xuống góc trái dưới
      // Nếu có NSquareToWin - 1 cặp liên tiếp giống nhau thì thắng
      // Direction: ToRight, ToRightDown, ToDown, ToLeftDown
      if (!squares[i][j]) continue;
      if (j <= squares[i].length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k += 1) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: 'ToRight' };
      }
      if (i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k += 1) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false;
          }
        }
        if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToDown' };
      }
      if (
        j <= squares[i].length - nSquareToWin &&
        i <= squares.length - nSquareToWin
      ) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k += 1) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: 'ToRightDown' };
      }
      if (i <= squares.length - nSquareToWin && j >= nSquareToWin - 1) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k += 1) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: 'ToLeftDown' };
      }
    }
  }
  return null;
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDescending: true,
      load: true
    };
    this.sort = this.sort.bind(this);
  }

  jumpTo(step) {
    this.setState({
      load: !this.state.load
    });
    this.props.onJump(step);
  }

  sort() {
    this.setState({ isDescending: !this.state.isDescending });
  }

  render() {
    const current = this.props.square.history[this.props.square.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = this.props.square.history.map((step, move) => {
      const desc = move
        ? `Go to move #${move} (${step.location.x},${step.location.y})`
        : 'Go to game start';
      return this.state.stepNumber === move ? (
        <li key={move}>
          <button
            type="button"
            className="btn-bold"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      ) : (
        <li key={move}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    if (!this.state.isDescending) {
      moves = moves.reverse();
    }

    let status;
    if (winner) {
      status = `Winner: ${winner.val}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="content">
        <div className="game">
          <div className="game-info">
            <h1>Game caro Việt Nam</h1>
            <div style={{ fontSize: 20, marginTop: 20 }}>{status}</div>
            <ol>{moves}</ol>
          </div>
          <div className="game-board">
            <Board winner={winner} squaresRow={current} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStatetoProps = state => {
  return state;
};
const mapDispatchtoProps = dispatch => {
  return {
    onJump: step => {
      dispatch(action.onJump(step));
    }
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Game);
