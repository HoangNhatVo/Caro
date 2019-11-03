import * as type from '../constants/Actiontype';

const tmpArr = Array(20);
for (let i = 0; i < 20; i += 1) {
  tmpArr[i] = Array(20).fill(null);
}
function calculateWinner(squares) {
  let win;
  for (let i = 0; i < squares.length; i += 1) {
    for (let j = 0; j < squares[i].length; j += 1) {
      // Kiểm trang 5 ô liên tiếp từ ô xuất phát sang phải, xuống góc phải dưới, xuống góc trái dưới
      // Nếu có 5 - 1 cặp liên tiếp giống nhau thì thắng
      // Direction: ToRight, ToRightDown, ToDown, ToLeftDown
      if (!squares[i][j]) continue;
      if (j <= squares[i].length - 5) {
        win = true;
        for (let k = 0; k < 5 - 1; k += 1) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: 'ToRight' };
      }
      if (i <= squares.length - 5) {
        win = true;
        for (let k = 0; k < 5 - 1; k += 1) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false;
          }
        }
        if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToDown' };
      }
      if (j <= squares[i].length - 5 && i <= squares.length - 5) {
        win = true;
        for (let k = 0; k < 5 - 1; k += 1) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: 'ToRightDown' };
      }
      if (i <= squares.length - 5 && j >= 5 - 1) {
        win = true;
        for (let k = 0; k < 5 - 1; k += 1) {
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
const initalState = {
  history: [
    {
      squares: tmpArr,
      location: null
    }
  ],
  stepNumber: 0,
  xIsNext: true
};
const myReducer = (state = initalState, action) => {
  if (action.type === type.MAKE_CHESS) {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[state.stepNumber];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    });

    if (calculateWinner(squares) || squares[action.i][action.j]) {
      return state;
    }
    squares[action.i][action.j] = state.xIsNext ? 'X' : 'O';
    return {
      history: history.concat([
        {
          squares,
          location: { x: action.i, y: action.j }
        }
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext
    };
  }
  if (action.type === type.RANDOM_CHESS) {
    let ranI = Math.floor(Math.random() * 20);
    let ranJ = Math.floor(Math.random() * 20);
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[state.stepNumber];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    });
    if (calculateWinner(squares)) {
      return state;
    }
    while (squares[ranI][ranJ]) {
      ranI = Math.floor(Math.random() * 20);
      ranJ = Math.floor(Math.random() * 20);
    }
    squares[ranI][ranJ] = state.xIsNext ? 'X' : 'O';
    return {
      history: history.concat([
        {
          squares,
          location: { x: ranI, y: ranJ }
        }
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext
    };
  }
  if (action.type === type.JUMP) {
    state.stepNumber = action.step;
    state.xIsNext = action.step % 2 === 0;
    if (!state.xIsNext) {
      let ranI = Math.floor(Math.random() * 20);
      let ranJ = Math.floor(Math.random() * 20);
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[state.stepNumber];
      const squares = current.squares.slice();
      current.squares.map((row, idx) => {
        squares[idx] = current.squares[idx].slice();
        return true;
      });
      if (calculateWinner(squares)) {
        return state;
      }
      while (squares[ranI][ranJ]) {
        ranI = Math.floor(Math.random() * 20);
        ranJ = Math.floor(Math.random() * 20);
      }
      console.log(ranI, ranJ);
      squares[ranI][ranJ] = state.xIsNext ? 'X' : 'O';
      return {
        history: history.concat([
          {
            squares,
            location: { x: ranI, y: ranJ }
          }
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext
      };
    }
    return state;
  }

  return state;
};
export default myReducer;
