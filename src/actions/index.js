import * as type from '../constants/Actiontype';

export const makeChess = (i, j) => {
  return {
    type: type.MAKE_CHESS,
    i,
    j
  };
};

export const randomCheck = () => {
  return {
    type: type.RANDOM_CHESS
  };
};
export const onJump = step => {
  return {
    type: type.JUMP,
    step
  };
};
