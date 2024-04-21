import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { log } from 'console';

import { createToken, setStart, appendMessage} from './api/tokens.js';
import { mState, serverGames } from './api/state.js';
import { changeTurnOrder } from './api/mGameFlow.js';

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.post((req, _, next) => {
  log('<-----------BODY INCOMING START -------------->');
  log('<--------------------------------------------->');
  log('<--------------------------------------------->');
  log(req.body);
  log('<--------------------------------------------->');
  log('<--------------------------------------------->');
  log('<------------BODY INCOMING END --------------->');
  next();
})

app.post('/testToken', async (req, res) => {
  try {
    const {room} = await req.body
    const chosenRoom = serverGames[room];
    res.send(JSON.stringify({chosenRoom}));
  } catch (err) {
    log(err);
  }
})
app.post('/getToken', async (req, res) => {
  try {
    const token = await createToken(req.body); 
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
    if (!mState[Number(room)]) res.send(JSON.stringify('egg')); // don't change without changing client-side
    else res.send(JSON.stringify(mState[Number(room)]));
  } catch (err) {
    log('error waiting for game start!, err');
  }
})
app.post('/setStateAfterTurn/:room', async (req, res) => {
  try {
    const { room } = req.params;
    changeTurnOrder(req.body.state, Number(room))
    res.end();
  } catch (err) {
    log('error getting state after a turn!', err);
  }
})
app.post('/sendMessage/:room', async (req, res) => {
  try {
    const { room } = req.params;
    appendMessage(req.body.input, Number(room))
  } catch (err) {
    log('error getting chat message!', err);
  }
})

app.listen(PORT, () => log('Listening on port ' + PORT + '.'));