'use strict';

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const myRouter = express.Router();

const model = {
  nodata: {
    msg: 'no model'
  }
};

app.use(jsonParser);

app.use((req, res, next) => {
  req.model = model;
  next();
})

app.use((req, res, next) => {
  console.log('Request:', req.url);
  next();
})

myRouter.get('/', (req, res) => {
  res.send('You get me');
});

app.get('/:id', (req, res) => {
  let id = req.params.id;
  res.json({message: id.toUpperCase()});
});

app.post('/articles', (req, res) => {
  res.json({message: 'post success'})
});

app.put('/articles', (req, res) => {
  res.json({message: 'put success'});
});

app.patch('/articles', (req, res) => {
  res.json({message: 'patch success'});
});

app.delete('/articles', (req, res) => {
  res.json({message: 'delete success'});
});

app.get('/*', (req, res) => {
  res.status(404).json({message: 'not found'});
})

app.listen(3000, () => console.log('up on 3000'));
