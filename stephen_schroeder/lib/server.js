'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const myRoute = express.Router();

app.use(jsonParser);
app.use('/tNails', myRoute);

myRoute.get('/:id', (req, res)=>{
  let id = req.params.id;
  res.json({message: id});
})

myRoute.post('/', (req, res)=>{
  res.json({name: 'Confederacy of Dunces'});
})

myRoute.put('/:id', (req, res)=>{
  let id = req.params.id;
  res.json({message: 'file ' + id + ' has been changed'});
})

myRoute.patch('/:id', (req, res)=>{
  let id = req.params.id;
  res.json({message: 'the file ' + id + ' has been changed'});
})

myRoute.delete('/:id', (req, res)=>{
  let id = req.params.id;
  res.json({message: 'the file ' + id + ' has been removed'});
})

app.get('/*', (req, res)=>{
  res.status(404).json({message:'NOT FOUND'});
})

app.listen(3000, ()=>{
  console.log('Server up on 3000')
})
