import React from 'react';
import { connect } from 'react-redux';
import SquareRow from './SquareRow';

class Board extends React.Component {
  render() {
    const current = this.props.squaresRow;
    const board = current.squares.map((row, idx) => {
      const k = `r${idx}`;
      return (
        <SquareRow winner={this.props.winner} rowIdx={idx} row={row} key={k} />
      );
    });
    return <div>{board}</div>;
  }
}
const mapStatetoProps = state => {
  return state;
};
export default connect(
  mapStatetoProps,
  null
)(Board);
