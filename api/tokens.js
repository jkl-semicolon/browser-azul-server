import { ourPlayers } from "./state.js";

const createToken = (body) => {
  const { name } = body;
  console.log(name);
  console.log(ourPlayers);
  ourPlayers.forEach(player => {if (player === name) return 'failureee'})
  ourPlayers.push(name);
  console.log('OURPLAYERS', ourPlayers);
  return `${ourPlayers.length}${name}`
}

export {createToken};