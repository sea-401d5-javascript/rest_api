'use strict';

var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.get('/request', (req, res) => {
  res.status(201);
  console.log('Request route hit');
  res.send('Request read');
});

app.post('/request', (req, res) => {
  console.log('Post route hit');
  res.json({message: 'Request created'});
});

app.put('/request', (req, res) => {
  console.log('Put route hit');
  res.writeHead(200, {'Content-Type':'application/json'});
  res.write(JSON.stringify({message: 'Request updated'}));
  res.end();
});

app.delete('/request', (req, res) => {
  console.log('delete route hit!');
  res.send('Hello from delete route');
});

app.get('/*', (req, res) => {
  res.status(404).json({msg: 'not found'});
})

app.listen(3000, function() {
  console.log('Request app listening on port 3000!');
});
