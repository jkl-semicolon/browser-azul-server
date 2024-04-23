import { mState, serverGames } from "./state.js";

/**
 * Local variable used for createStaging.
 */
const landingPattern = [
  ['blue','yellow','red','purple','green'],
  ['green','blue','yellow','red','purple'],
  ['purple','green','blue','yellow','red'],
  ['red','purple','green','blue','yellow'],
  ['yellow','red','purple','green','blue'],
];

/**
 * Fisher-Yates Shuffle, sourced from: https://bost.ocks.org/mike/shuffle/.
 * To help randomize players for function setTurnOrder, and for shuffling tiles in bag.
 * @param {array}, array of player objects 
 * @returns {array}, array of shuffled player objects
 */
const shuffle = (array) => {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  };
  return array;
};

/**
 * Occurs at the start of a game, and when the reset button is pressed. Sets up a
 * blank state object for the game to utilize.
 */
const resetState = (room) => {
  ['gameStart', 'activeGrab', 'activeStaging',].forEach(s => room[s] = false);
  ['numberPlayers', 'factoryTiles', 'currentPlayer', 'turnCounter',].forEach(s => room[s] = 0);
  ['turnOrder', 'bag', 'discard', 'players',].forEach(s => room[s] = []);
  room.middle = [[],];
  room.winner = '';
};

const playerColors = ['#F7D9C4', '#C9E4DE', '#C6DEF1', '#F2C6DE'];
/**
 * Initializes empty player objects in state.players.
 * @param {number} numberPlayers, the number of players selected
 */
const initializePlayers = (state, numberPlayers, competitors) => {
  const randNames = shuffle(competitors);
  const randColors = shuffle(playerColors);
  for (let i=0; i<numberPlayers; i++) {
    state.players.push({
      name: randNames[i],
      color: randColors[i],
      score: 0,
      limbo: [],
      staging: [[],[],[],[],[],],
      landing:  [[],[],[],[],[],],
      broken: [],
      firstNext: false,
    });
    state.turnOrder = state.players; //////////////////////////////////////////////////////////
  };
};

/**
 * Helps set the factory tile number for the number of players, and adds their arrays to state.
 */
const setFactoryTiles = (state) => {
  state.factoryTiles = (state.players.length === 2) ? 5 : (state.players.length === 3) ? 7 : 9;
  for (let i=0; i<state.factoryTiles; i++) state.middle.push([]);
};

/**
 * Fills 100 tiles of 5 different colors into the grab bag at the start of the game.
 * Uses a row of landing pattern to know which tiles to push.
 */
const fillBag = (state) => {
  landingPattern[0].forEach(tile => {for (let i=0; i<20; i++) state.bag.push(tile)});
  shuffle(state.bag);
};

export { resetState, shuffle, initializePlayers, setFactoryTiles, fillBag};





