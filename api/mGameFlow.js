import { mState, serverGames } from "./state.js";
import { shuffle } from "./mGameSetup.js";
import { endRoundScoring, endGameScoring } from "./mScoring.js";
import { log } from 'console';

let bandaid = {}; /////////////////////////////////////////////////////

/**
 * Checks if the end game condition of a player finishing a row in their landing area.
 * If so, game proceeds to end game scoring. Otherwise, start another round.
 */
const newRoundOrNawww = (state) => {
  for (const player of state.turnOrder) {
    for (const playerLandingRow of player.landing) {
      if (playerLandingRow.length === 5) {
        endGameScoring(state);          ////////////////////////////////////// may need to set mState equal to state for endgamescoring!!!! 
        return;
      }
    }
  }
  startRound(state);                   
}

/**
 * Occurs at the start of a new round; adds four tiles from the bag to
 * each factory tile in the middle. Shuffles discard into bag if 
 * there are not enough tiles in the bag. If still not enough, leave rest empty.
 */
const popFacTiles = (state) => {
  for (let i=1; i<=state.factoryTiles; i++) {
    for (let j=0; j<4; j++) {
      if ((state.bag.length === 0) && (state.discard.length === 0)) return;
      if (state.bag.length === 0) {
        state.discard.forEach(tile => state.bag.push(tile));
        state.discard = [];
        shuffle(state.bag);
      };
      state.middle[i].push(state.bag.pop());
    };
  };
};

/**
 * Places 1st player tile in middle of table.
 */
const placeFirstTile = (state) => state.middle[0].push('first');

/**
 * Sets player order randomly at the start of the first round, then sets 
 * player order according to the 1st player marker at the start of subsequent rounds.
 */
const setPlayerOrder = (state) => {
  shuffle(state.turnOrder); ///////////////////////////////////////////////////////////////////////
  for (let i=0; i<state.turnOrder.length; i++) {
    if (state.turnOrder[i].firstNext) {
      state.turnOrder.unshift(state.turnOrder.splice(i,1)[0]);
      for (const player of state.turnOrder) player.firstNext = false; //////////////////////////////////////////////////////////
    };
  };
};

/**
 * Occurs at the start of each round. Place four tiles on each factory tile
 * and place 1st player tile in the middle. Render the main area, set player order,
 * set the round's turn tracker to 0, and start the turn of the first player
 * in the round.
 */
const startRound = (state) => {
  popFacTiles(state);
  placeFirstTile(state);
  // renderMainArea(); ///////////////////
  setPlayerOrder(state);
  state.turnCounter = 0;
  takeTurn(state);
};

/**
 * Occurs either at the end of a round start, or if another turn is
 * determined to be needed. Switches the current player, renders
 * player boards in correct positions, and turns on first event 
 * listener for the active player.
 */
const takeTurn = (state) => {

  state.currentPlayer = state.turnCounter % state.turnOrder.length
  state.turnCounter++;
  // renderPlayers(); ////////////////////////////////////////////////////////////
  state.activeGrab = true;
  // mState[room] = state;
  // createInstructions(state.turnOrder[state.currentPlayer]);    ///////////////////////
};

/**
 * Occurs at the end of the second event handler of a player's turn. 
 * Checks to see if another turn in the round is needed, and either a new
 * turn occurs or end round scoring occurs.
 */
const newTurnOrNawww = (state) => {
  let midHasTiles;
  state.middle.forEach((part) => {
    if (part.length) midHasTiles = true;
  });
  if (midHasTiles) takeTurn(state);
  else endRoundScoring(state);
};

const changeTurnOrder = (state, room) => {
  newTurnOrNawww(state)
  // takeTurn(state);
  mState[room] = state; ////////////////////////////////////////////////////////////////
  // console.log('MSTATE ROOM CHANGINGGGGG', mState[room])
  // console.log('SINGLE PLAYER STAGING', mState[room].players[1].staging)
  // console.log('SINGLE (TURN) PLAYER STAGING', mState[room].turnOrder[1].staging)
}


export { newRoundOrNawww, startRound, changeTurnOrder }