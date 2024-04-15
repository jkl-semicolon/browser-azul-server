import { mState, serverGames } from "./state.js";

const resetState = (room) => {
  ['gameStart', 'activeGrab', 'activeStaging',].forEach(s => room[s] = false);
  ['numberPlayers', 'factoryTiles', 'currentPlayer', 'turnCounter',].forEach(s => room[s] = 0);
  ['turnOrder', 'bag', 'discard', 'players',].forEach(s => room[s] = []);
  room.middle = [[],];
};

export { resetState, };