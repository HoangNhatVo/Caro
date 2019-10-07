import React from 'react';
import { connect } from 'react-redux';
import Square from './Square';
import * as action from '../actions/index';

const nSquareToWin = 5;
class SquareRow extends React.Component {
  render() {
    const squareRow = this.props.row.map((square, idx) => {
      const k = `s${idx}`;
      let win = false;
      if (this.props.winner) {
        if (
          this.props.winner.direction === 'ToRight' &&
          idx >= this.props.winner.x &&
          idx <= this.props.winner.x + nSquareToWin - 1 &&
          this.props.rowIdx === this.props.winner.y
        ) {
          win = true;
        }
        if (
          this.props.winner.direction === 'ToDown' &&
          this.props.rowIdx >= this.props.winner.y &&
          this.props.rowIdx <= this.props.winner.y + nSquareToWin - 1 &&
          idx === this.props.winner.x
        ) {
          win = true;
        }
        if (
          this.props.winner.direction === 'ToRightDown' &&
          idx >= this.props.winner.x &&
          idx <= this.props.winner.x + nSquareToWin - 1 &&
          idx - this.props.winner.x === this.props.rowIdx - this.props.winner.y
        ) {
          win = true;
        }
        if (
          this.props.winner.direction === 'ToLeftDown' &&
          idx <= this.props.winner.x &&
          idx >= this.props.winner.x - nSquareToWin + 1 &&
          this.props.winner.x - idx === this.props.rowIdx - this.props.winner.y
        ) {
          // console.log(
          //   `${winner.x} ${winner.y} ${idx} ${rowIdx} ${nSquareToWin}`
          // );
          win = true;
        }
      }
      return (
        <Square
          win={win}
          value={square}
          onClick={() => this.props.onMark(this.props.rowIdx, idx)}
          key={k}
        />
      );
    });
    return <div className="board-row">{squareRow}</div>;
  }
}
const mapStatetoProps = state => {
  return state;
};

const mapDispatchtoProps = dispatch => {
  return {
    onMark: (i, j) => {
      dispatch(action.makeChess(i, j));
    }
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(SquareRow);
