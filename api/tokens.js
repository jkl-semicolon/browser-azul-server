import { mState, serverGames } from "./state.js";
import { resetState, shuffle, initializePlayers, setFactoryTiles, fillBag } from "./mGameSetup.js";
import { newRoundOrNawww } from "./mGameFlow.js";

const createToken = (body) => {
  const { name, room } = body;
  console.log('PLAYER:', name, 'IN ROOM', room);
  if (!serverGames[room]) {
    serverGames[room] = {
      players: [],
      tokens: [],
      start: [],
      messages: []
    };
  };
  serverGames[room].players.push(name);
  const token = `${serverGames[room].players.length}${name}${room}`;
  serverGames[room].tokens.push(token);
  serverGames[room].start.push(false);
  return serverGames[room].tokens[serverGames[room].players.length-1];
}

const setStart = (body) => {
  try {
    const { start, token, room } = body;
    serverGames[room].start.pop();
    serverGames[room].start.unshift(start);
    let startGame = true;
    serverGames[room].start.forEach(start => {
      if (start === false) startGame = false;
    });
    if (startGame) {
      console.log('game is starting!!!!');
      serverGames[room].start.pop();
      serverGames[room].start.unshift(false); ////////////// bandaid for a bug
      serverGames[room].start.pop();
      serverGames[room].start.unshift(false);
      startMGame(room);
    }
  } catch (err) {
    console.log(err);
  }
}

const startMGame = (roomNum) => {
  let competitors = [];
  mState[roomNum] = {};
  resetState(mState[roomNum]);
  competitors = [...serverGames[roomNum].players];
  mState[roomNum].gameStart = true;
  shuffle(competitors);
  initializePlayers(mState[roomNum], competitors.length, competitors);
  setFactoryTiles(mState[roomNum]);
  fillBag(mState[roomNum]);
  newRoundOrNawww(mState[roomNum]);
}

const appendMessage = (message, room) => {
  serverGames[room].messages.push(message);
  if (serverGames[room].messages.length > 12) {
    serverGames[room].messages.shift();
  }
}

export {createToken, setStart, appendMessage}