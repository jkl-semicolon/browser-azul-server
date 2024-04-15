import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { log } from 'console';

import { createToken, setStart } from './api/tokens.js';
import { serverGames } from './api/state.js';

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.post('/testToken', async (req, res) => {
  try {
    const {room} = await req.body
    const chosenRoom = serverGames[Number(room)];
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
    res.end();
  } catch (err) {
    log('error starting game!', err);
  }
})

app.listen(PORT, () => log('Listening on port ' + PORT + '.'));