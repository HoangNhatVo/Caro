import React from 'react';

function Square(props) {
  return props.win ? (
    <button
      type="button"
      className="square square-highlight"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  ) : (
    <button type="button" className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
export default Square;
