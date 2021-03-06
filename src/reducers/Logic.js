import { MOVE } from '../constants';

//
const Logic = {
  getWinner: moves => {
    for (let i = 0; i < 9; i += 3) {
      const col1 = moves[i + 0];
      const col2 = moves[i + 1];
      const col3 = moves[i + 2];
      if (col1 === col2 && col2 === col3 && col1 !== MOVE.PENDING.val) {
        return { winner: col1, winnerMoves: [i, i + 1, i + 2] };
      }
    }
    for (let i = 0; i < 3; i += 1) {
      const row1 = moves[i + 0];
      const row2 = moves[i + 3];
      const row3 = moves[i + 6];
      if (row1 === row2 && row2 === row3 && row1 !== MOVE.PENDING.val) {
        return { winner: row1, winnerMoves: [i, i + 3, i + 6] };
      }
    }
    const topLeft = moves[0];
    const topRight = moves[2];
    const center = moves[4];
    const bottomLeft = moves[6];
    const bottomRight = moves[8];
    if (
      topLeft === center &&
      center === bottomRight &&
      topLeft !== MOVE.PENDING.val
    ) {
      return { winner: topLeft, winnerMoves: [0, 4, 8] };
    }
    if (
      topRight === center &&
      center === bottomLeft &&
      topRight !== MOVE.PENDING.val
    ) {
      return { winner: topRight, winnerMoves: [2, 4, 6] };
    }
    return { winner: null, winnerMoves: null };
  },

  isFull: moves => {
    const exists = moves.find(move => move === MOVE.PENDING.val);
    return typeof exists === 'undefined';
  },

  updateMoves: (moves, moveIdx, player) => {
    if (typeof moveIdx !== 'number' || moveIdx < 0 || moveIdx > 8) {
      throw new Error(`Invalid param moveIdx: ${moveIdx}`);
    }
    if (![MOVE.PLAYER_1.val, MOVE.PLAYER_2.val].includes(player)) {
      throw new Error(`Invalid player value: ${player}`);
    }
    const updatedMoves = [...moves];
    updatedMoves[moveIdx] = player;
    return updatedMoves;
  },

  getNextPlayer: xIsNext => (xIsNext ? MOVE.PLAYER_2.val : MOVE.PLAYER_1.val),

  makeMove: (moveIdx, state) => {
    const { moves, xIsNext } = state;
    const player = Logic.getNextPlayer(xIsNext);
    const updatedMoves = Logic.updateMoves(moves, moveIdx, player);
    const isFull = Logic.isFull(updatedMoves);
    const { winner, winnerMoves } = Logic.getWinner(updatedMoves);

    return {
      ...state,
      moves: updatedMoves,
      xIsNext: !xIsNext,
      winner,
      winnerMoves,
      isFull
    };
  }
};

export default Logic;
