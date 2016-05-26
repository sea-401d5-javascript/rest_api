'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const firstRouter = express.Router();

app.use(jsonParser);

firstRouter.get('/', (req, res) => {
  res.send('GAAAW GAAAW')
})

firstRouter.delete('/:id', (req, res) => {
  let message = `Poor penguin #${req.params.id} brutally murderes.`;
  res.send(message);
})

app.get('/', (req, res) => {
  res.send('It got to me first');
});

app.get('/', (req, res) => {
  console.log('route hit!');
  res.send('HELLO');
});

app.use('/penguins', firstRouter);

app.get('/:id', (req, res) => {
  let id = req.params.id;
  console.log('hellow from the id get route');
  res.json({message: id.toUpperCase()});
});

app.post('/', (req, res) => {
  console.log('post route hit!');
  console.log('Request Body:', req.body);
  res.json({ message: 'Hello from post route'});
});

app.put('/', (req, res) => {
  console.log('put route hit!');
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({message: 'Hellow from put route'}));
});

app.delete('/', (req, res) => {
  console.log('delete route hit!');
  res.send('Hello from delete route');
});

app.get('/*,', (req, res) => {
  res.status(404).json({msg: 'not found'});
});


app.listen(3000, () => console.log('up on 3000'));
