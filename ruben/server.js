'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// const playerRouter = express.Router();
const mongoose = require('mongoose');
const errorHandler = require('./lib/error-handler');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect('mongodb://localhost/dev_db');

const playerRouter = require('./routes/player-routes');

app.use(jsonParser);

playerRouter.get('/', (req, res) => {
  res.send('PLAYERS');
});

playerRouter.delete('/:id', (req, res) => {
  let message = `Poor player #${req.params.id} got injured.`;
  res.send(message);
});

app.get('/', (req, res) => {
  console.log('get route hit')
  res.send('HELLO');
});

app.use('/nbaPlayers', playerRouter);
app.use('/nflPlayers', playerRouter);

app.get('/:id', (req, res) => {
  let id = req.params.id;
  console.log('id route hit');
  res.json({message: id.toUpperCase()});
});

app.post('/', (req, res) => {
  console.log('post route hit');
  console.log('Request Body:', req.body);
  res.json({message: 'Hello from post route'});
});

app.put('/', (req, res) => {
  console.log('put route hit');
  res.writeHead(200, {'Content-type': 'application/json'});
  res.write(JSON.stringify({message: 'Hello from put route'}));
  res.end();
});

app.delete('/', (req, res) => {
  console.log('delete route hit');
  res.end();
});

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'});
});

app.listen(3000, () => console.log('up on 3000'));
