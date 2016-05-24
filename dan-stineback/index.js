'use strict';

var express = require('express');
var app = express();
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

app.post('/', (req, res) => {
  console.log('Hey Mr. Post-man. ');
  res.json({message: 'This is some sweet sweet JSON. '})
});

app.put('/', (req, res) => {
  console.log('Put your hands up! ');
});

app.patch('/', (req, res) => {
  console.log('Patchy patchface. ');
});
app.delete('/:id', (req, res) => {
  console.log('Seek and destroy! ');
})

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'});
})

app.listen(3000, () => console.log('server is up on 3000'));
