import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { log } from 'console';

import { createToken, setStart, } from './api/tokens.js';
import { mState, serverGames } from './api/state.js';

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.post('/testToken', async (req, res) => {
  try {
    const {room} = await req.body
    log(typeof room)
    log(serverGames);
    const chosenRoom = serverGames[room];
    log(chosenRoom);
    res.send(JSON.stringify({chosenRoom}));
  } catch (err) {
    log('helloooooo')
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
    res.end();
  } catch (err) {
    log('error starting game!', err);
  }
})
app.get('/waitStart/:room', async (req, res) => {
  try {
    const { room } = req.params;
    console.log('getting pinged')
    if (!mState[Number(room)]) res.end();
    else res.send(JSON.stringify(mState[Number(room)]));
  } catch (err) {
    log('error waiting for game start!, err');
  }
})

app.listen(PORT, () => log('Listening on port ' + PORT + '.'));