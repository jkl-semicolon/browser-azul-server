import { mState, serverGames } from "./state.js";
import { resetState } from "./mGameSetup.js";

const createToken = (body) => {
  const { name, room } = body;
  if (!serverGames[room]) {
    serverGames[room] = {
      players: [],
      tokens: [],
      start: [],
    };
  };
  serverGames[room].players.push(name);
  const token = `${serverGames[room].players.length}${name}${room}`;
  serverGames[room].tokens.push(token);
  serverGames[room].start.push(false);
  console.log('SERVER GAMES IN CREATE TOKEN', serverGames);
  return serverGames[room].tokens[serverGames[room].players.length-1];
}

const setStart = (body) => {
  try {
    const { start, token, room } = body;
    serverGames[room].start.pop();
    serverGames[room].start.unshift(start);
    console.log('serverGames[room]', serverGames[room])
    let startGame = true;
    serverGames[room].start.forEach(start => {
      if (start === false) startGame = false;
    });
    if (startGame) {
      console.log('game is starting!!!!');
      startMGame(room);
    }
  } catch (err) {
    console.log(err);
  }
}

const startMGame = (room) => {
  const myRoom = mState[room];
  resetState(myRoom); // TODO PUSH PLAYERS IN, MAKE SURE PLAYER ORDER IS GOOD, FIND OUT HOW TO START THE GAME.
}

export { createToken, setStart, };