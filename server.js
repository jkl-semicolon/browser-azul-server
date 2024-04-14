import express from 'express';
import cors from 'cors';
import { log } from 'console';
// import morgan from 'morgan';

import { createToken } from './api/tokens.js';

const PORT = 8000;

const app = express();

// app.use(morgan());
app.use(cors());
// app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.get('/', async (req, res) => {
  try {
    res.send('hello from your azul host!');
  } catch (err) {
    log('error connecting!', err);
  }
})

// api.get('/test', async(req, res) => {
//   try {
//     console.log(req.body);
//     res.send({hello:'i am responding!'});
//   } catch (err) {
//     log(err);
//   }
// })

app.post('/getToken', async (req, res) => {
  try {
    const token = createToken(req.body); 
    log('TOKEN:', token);
    if (token === 'failureee') throw new Error('Already a player of the same name!');
    res.send(JSON.stringify({token}));
  } catch (err) {
    log('error getting token to play!', err);
  }
})

// app.get('/play', async (req, res) => {
//   try {

//   } catch (err) {
//     log('error getting state!', err);
//   }
// })

// app.put('/play', async (req, res) => {
//   try {

//   } catch (err) {
//     log('error updating state!', err);
//   }
// })

app.listen(PORT, () => log('Listening on port ' + PORT + '.'));