'use strict'
const fs = require('fs');
const stream = require('stream');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const firstRouter = express.Router();

app.use(jsonParser);

firstRouter.post('/', (req,res) => {
  console.log('hit post route');
  let frenchie = '';
  req.on('data', (data) => {
    frenchie += data.toString();

  })
  req.on('end', () => {
    var nextFile = (fs.readdirSync(__dirname + '/data/')).length +1
    let file = fs.createWriteStream(__dirname + '/data/frenchie' + nextFile + '.json')
    var bufferStream = new stream.PassThrough();
    let inBuf = new Buffer(frenchie);
    bufferStream.end(inBuf);
    bufferStream.pipe(file);
    res.json({message: 'Saved a Frenchie'})
  })
})

firstRouter.get('/', (req,res) => {
  console.log('hit get route');
  res.send('Hello, here is a Frenchie' + '\n')
})


firstRouter.put('/:frenchie_id', (req,res) => {
  console.log('hit the put route');
    let id = req.params.frenchie_id
    var stream = fs.createWriteStream(__dirname + '/data/frenchie' + id + '.json')
    req.pipe(stream);
    res.send('Updated Frenchie' + '\n')
  })


firstRouter.delete('/:frenchie_id', (req,res) => {
  console.log('hit the delete route');
  var frenchie_id = req.params.frenchie_id
  fs.unlinkSync(__dirname + '/data/frenchie' + frenchie_id + '.json')
  res.send('deleted frenchie' + '\n')
})

app.use('/frenchies', firstRouter);

app.get('/*', (req,res) => {
  res.status(404).send('Not Found');
})



app.listen(3000, () => console.log('listening on 3000'));
