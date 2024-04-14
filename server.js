import express from 'express';
import cors from 'cors';
import { log } from 'console';

import { createToken } from './api/tokens.js';
import { serverGames } from './api/state.js';

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/testToken', async (req, res) => {
  try {
    const {room} = await req.body
    // log('ROOM:', room)
    // log('TYPEOF ROOM', typeof room)
    log('SERVER GAMES IN SERVER.JS,',serverGames);
    const chosenRoom = serverGames[Number(room)];
    log('CHOSEN ROOM:', chosenRoom);
    res.send(JSON.stringify({chosenRoom}));
  } catch (err) {
    log(err);
  }
})
app.post('/getToken', async (req, res) => {
  try {
    const token = createToken(req.body); 
    res.send(JSON.stringify(token));
  } catch (err) {
    log('error getting token to play!', err);
  }
})
app.post('/setStart', async (req, res) => {
  try {
    setStart(req.body);
  } catch (err) {
    log('error starting game!', err);
  }
})

app.listen(PORT, () => log('Listening on port ' + PORT + '.'));