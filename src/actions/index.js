import * as type from '../constants/Actiontype';

export const makeChess = (i, j) => {
  return {
    type: type.MAKE_CHESS,
    i,
    j
  };
};
