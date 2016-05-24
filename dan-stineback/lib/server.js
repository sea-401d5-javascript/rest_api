'use strict';

const express = require('express');
const router = require(__dirname + ('/server'));
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const myRouter = express.Router();

app.use(jsonParser);


app.get('/', (req, res) => {
  console.log('you got get');
  res.send('Mission accomplished. Time for a beer.  ');
});

app.get('/zoots', (req, res) => {
  console.log('Zoots fool. ');
  res.send('Zoots Zoots. ');
});

app.post('/zoots', (req, res) => {
  console.log('Hey Mr. Post-man. ');
  res.json({message: 'This is some sweet sweet JSON. '});
});

app.put('/zoots', (req, res) => {
  console.log('Put your hands up! ');
  res.json({message: 'Party Under Trees JSON '});
});

app.patch('/zoots', (req, res) => {
  console.log('Patchy patchface. ');
  res.json({message: 'Just a small fix JSON'});
});
app.delete('/:id', (req, res) => {
  console.log('Seek and destroy! ');
  let mes = req.params.id + ' Nothing to see here folks';
  res.send(mes);
});

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'});
});
app.listen(3000, () => console.log('server is up on 3000'));