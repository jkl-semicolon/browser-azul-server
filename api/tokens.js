import { serverGames } from "./state.js";

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

// const testToken = 

// const setStart = (body) => {

// }

export {createToken};