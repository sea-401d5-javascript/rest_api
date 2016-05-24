'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const myRoute = express.Router();

module.exports = exports = function start() {
  app.use(jsonParser);


  app.post('/', (req, res) => {
    console.log('post route hit!');
    console.log('Request Body:', req.body);
    res.json({ msg: ':/id.'});
  });

  app.get('/:id', (req, res) => {
    let id = req.params.id;
    console.log('hello from the get route');
    res.json({ msg: id.toUpperCase() });
  });

  app.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log('removing files by id');
    res.json({ msg: 'File ' + id + ' has been removed' });
  })

  app.put('/:id', (req, res) => {
    console.log('put route hit!');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({message: 'Hello from put route'}));
  });

  app.patch('/:id', (req, res) => {
    console.log('file changed!');
    res.json({ msg: 'File ' + id + ' has been changed' });
  });

  app.get('/*,', (req, res) => {
    res.status(404).json({msg: 'not found'});
  });
}

app.use('/icoMatch', myRoute);

app.listen(3000, () => console.log('up on 3000'));
