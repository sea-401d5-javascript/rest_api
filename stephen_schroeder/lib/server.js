'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const myRoute = express.Router();

module.exports = exports = function start() {
  app.use(jsonParser);


  myRoute.post('/', (req, res) => {
    console.log('post route hit!');
    console.log('Request Body:', req.body);
    res.json({ msg: 'crassIsNotSass'});
  });

  myRoute.get('/:id', (req, res) => {
    let id = req.params.id;
    console.log('hello from the get route');
    res.json({ msg: id.toUpperCase() });
  });

  myRoute.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log('removing files by id');
    res.json({ msg: 'File ' + id + ' has been removed' });
  })

  myRoute.put('/:id', (req, res) => {
    let id = req.params.id;
    res.json({message: 'Hello from ' + id + ' put route'});
  });

  myRoute.patch('/:id', (req, res) => {
    console.log('file changed!');
    res.json({ msg: 'File ' + id + ' has been changed' });
  });

  myRoute.get('/*,', (req, res) => {
    res.status(404).json({msg: 'not found'});
  });
}

app.use('/icoMatch', myRoute);

app.listen(3000, () => console.log('up on 3000'));
