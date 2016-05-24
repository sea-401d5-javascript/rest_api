'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cruddyRouter = express.Router();

app.use(jsonParser);
//get response from route
cruddyRouter.get('/:id', (req, res)=>{
  let id = req.params.id;
  console.log('Getting stuff by id - ' + id);
  /* Code to deliver content to client */
  res.json({message: id.toUpperCase()});
})
//post new content to route
cruddyRouter.post('/', (req, res)=>{
  console.log('Posting JSON');
  /* Code to create record/file... */
  res.json({name: 'Jason'});
})
//update route with new content by replacing
cruddyRouter.put('/:id', (req, res)=>{
  let id = req.params.id;
  console.log('Collecting updates via PUT');
  /* Code to replace file */
  res.json({message: 'The record at ' + id + ' has been changed to BEERZ.'});
})
//update partial content at route
cruddyRouter.patch('/:id', (req, res)=>{
  let id = req.params.id;
  console.log('Altering records via PATCH.');
  /* Code to alter file */
  res.json({message: 'The record at ' + id + ' has been changed to ' + id + 'x1000.'});
})
//destroy record at route
cruddyRouter.delete('/:id', (req, res)=>{
  let id = req.params.id;
  console.log('Removing records by ID.');
  /* Code to remove file from records */
  res.json({message: 'There is no ' + id + '... wink, wink.'});
})

app.use('/things', cruddyRouter);

app.get('/*', (req, res)=>{
  res.status(404).json({message:'NOT FOUND'});
})

app.listen(8008, ()=>{
  console.log('Server up on 8008')
})
