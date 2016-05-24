'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const rooneyRouter = express.Router();

rooneyRouter.use(jsonParser);

app.use('/rooney', rooneyRouter);

rooneyRouter.get('/', (req, res) => {
  res.send('GLORY MAN UNITED')
})

rooneyRouter.get('/:id', (req,res) => {
  let id = req.params.id;
  console.log('hello from id get route');
  res.json({message: id.toUpperCase()})
})

rooneyRouter.post('/', (req, res) => {
  console.log('rooneyRouter post hit');
  console.log('request body', req.body);
  res.json({message:'hello from rooneyRouter post'});
})

rooneyRouter.put('/', (req, res) => {
  console.log('rooneyRouter put hit');
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({message: 'Hello from rooneyRouter put'}));
  res.end();
})

rooneyRouter.delete('/:id', (req, res) => {
  let message = `Poor ${req.params.id} is scheit.`;
  res.send(message);
})

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'})
})



app.listen(3000, () => console.log('up on 3000'));
